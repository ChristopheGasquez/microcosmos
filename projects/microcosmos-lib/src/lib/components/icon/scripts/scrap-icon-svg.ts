#!/usr/bin/env tsx
/**
 * Script: git-icons.ts
 * Version: 2.0
 *
 * Description:
 *   Clone léger + sparse checkout pour ne télécharger QUE les SVG 24px.
 *   Gestion récursive de la profondeur.
 *   Copies parallèles avec noms uniques.
 *   Affichage de progression.
 *   Dossiers locaux au même endroit que le script.
 */

import path from "path";
import fs from "fs-extra";
import simpleGit, { SimpleGit } from "simple-git";
import fg from "fast-glob";

const SCRIPT_DIR = __dirname;
const TMP_DIR = path.join(SCRIPT_DIR, "material-icons-temp");
const OUT_DIR = path.join(SCRIPT_DIR, "../icons");

async function main() {
  console.log("🚀 Starting optimized Material Icons fetch...");

  // Cleanup
  await fs.remove(TMP_DIR);
  await fs.ensureDir(TMP_DIR);
  await fs.ensureDir(OUT_DIR);
  await fs.emptyDir(OUT_DIR);

  // Init repository manually (required for sparse checkout BEFORE fetch)
  const git: SimpleGit = simpleGit(TMP_DIR);
  await git.init();
  await git.addRemote("origin", "https://github.com/google/material-design-icons.git");
  await git.raw(["config", "core.sparseCheckout", "true"]);

  // Sparse checkout pattern → récupération uniquement des 24px.svg, profondeur illimitée
  const sparseFile = path.join(TMP_DIR, ".git/info/sparse-checkout");
  await fs.writeFile(
    sparseFile,
    "src/**/materialicons/24px.svg\n",
    "utf8"
  );

  console.log("📄 Sparse checkout configured: only 24px SVGs will be downloaded.");

  // Enable progress output
  git.outputHandler((cmd, stdout, stderr) => {
    stdout.pipe(process.stdout);
    stderr.pipe(process.stderr);
  });

  console.log("⏬ Fetching only required files (progress below):");

  // Fetch branch info
  const defaultInfo = await simpleGit().listRemote([
    "--symref",
    "https://github.com/google/material-design-icons.git",
    "HEAD",
  ]);

  const match = defaultInfo.match(/refs\/heads\/(\w+)/);
  const defaultBranch = match ? match[1] : "master";

  // Fetch only sparse-selected files
  await git.fetch("origin", defaultBranch, {
    "--depth": "1",
    "--progress": null,
  });

  // Checkout branch (only sparse files downloaded)
  await git.checkout(defaultBranch);

  console.log("📁 Fetch finished, scanning downloaded SVG files...");

  // Scan recursively for 24px.svg files
  const pattern = path.join(TMP_DIR, "src/**/*.svg").replace(/\\/g, "/");
  const files = await fg(pattern);

  const svgFiles = files.filter((f) => f.endsWith("24px.svg"));

  console.log(`🔍 Found ${svgFiles.length} SVG icons.`);

  const copyTasks: Promise<void>[] = [];
/*
  for (const file of svgFiles) {
    // Relative path: category/.../icon/materialicons/24px.svg
    const rel = path.relative(path.join(TMP_DIR, "src"), file);

    // Build unique name from folder parts except last two (materialicons/24px.svg)
    const parts = rel.split(path.sep).slice(0, -2);
    const name = parts.join("-") + ".svg";

    const dest = path.join(OUT_DIR, name);

    copyTasks.push(
      fs.copy(file, dest).then(() => {
        console.log(`✔️  Copied: ${name}`);
      })
    );
  }*/

  for (const file of svgFiles) {
    const rel = path.relative(path.join(TMP_DIR, "src"), file);
    const parts = rel.split(path.sep);

    // parts = ["category", "...optional subfolders...", "iconName", "materialicons", "24px.svg"]

    const category = parts[0];
    const iconName = parts[parts.length - 3]; // juste avant "materialicons"

    // Nom simple (icône seule)
    let finalName = iconName.replace(/_/g, "-") + ".svg";

    // Si collision → category-icon
    const destSimple = path.join(OUT_DIR, finalName);
    if (await fs.pathExists(destSimple)) {
      finalName = `${iconName}--${category}`.replace(/_/g, "-") + ".svg";
    }

    const dest = path.join(OUT_DIR, finalName);

    copyTasks.push(
      fs.copy(file, dest).then(() => {
        console.log(`✔️  Copied: ${finalName}`);
      })
    );
  }

  await Promise.all(copyTasks);

  // Cleanup
  await fs.remove(TMP_DIR);

  console.log(`\n🎉 DONE!  All 24px SVGs were saved into: ${OUT_DIR}\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});



/*
#!/usr/bin/env tsx
/!**
 * Script: git-icons.ts
 * Version: 1.3
 *
 * Description:
 *   Télécharge le repo Google Material Icons dans le même dossier que le script,
 *   récupère tous les SVG 24px (peu importe la profondeur),
 *   les copie dans "icons" avec noms uniques, et nettoie le repo temporaire.
 *   Affiche la progression du téléchargement.
 *!/

import path from "path";
import fs from "fs-extra";
import simpleGit, { SimpleGit } from "simple-git";
import fg from "fast-glob";

const SCRIPT_DIR = __dirname;
const TMP_DIR = path.join(SCRIPT_DIR, "material-icons-temp");
const OUT_DIR = path.join(SCRIPT_DIR, "icons");

async function main() {
  console.log("Starting Material Icons download...");

  // Cleanup old folders
  await fs.remove(TMP_DIR);
  await fs.ensureDir(TMP_DIR);
  await fs.ensureDir(OUT_DIR);

  const git: SimpleGit = simpleGit();

  // Détecter la branche par défaut
  const remoteInfo = await git.listRemote(["--symref", "https://github.com/google/material-design-icons.git", "HEAD"]);
  const match = remoteInfo.match(/ref: refs\/heads\/(\w+)\s+HEAD/);
  const defaultBranch = match ? match[1] : "master";
  console.log(`Detected default branch: ${defaultBranch}`);

  console.log("Cloning repository (progress will be shown)...");

  // Affichage de la progression
  const gitWithProgress = simpleGit();
  gitWithProgress.outputHandler((command, stdout, stderr) => {
    stdout.pipe(process.stdout);
    stderr.pipe(process.stderr);
  });

  // Clone avec profondeur 1
  await gitWithProgress.clone("https://github.com/google/material-design-icons.git", TMP_DIR, [
    "--depth", "1",
    "--branch", defaultBranch,
    "--progress",
  ]);

  // Récupérer tous les fichiers 24px.svg récursivement
  const pattern = path.join(TMP_DIR, "src/!**!/!*.svg").replace(/\\/g, "/"); // Windows friendly
  const svgFiles = await fg(pattern);

  console.log(`Found ${svgFiles.length} SVG files. Copying...`);

  const copyTasks: Promise<void>[] = [];

  for (const file of svgFiles) {
    if (!file.endsWith("24px.svg")) continue;

    // Générer un nom unique basé sur le chemin relatif
    const relPath = path.relative(path.join(TMP_DIR, "src"), file);
    const nameParts = relPath.split(path.sep);
    // Exemple : category/subcategory/icon/materialicons/24px.svg -> category-subcategory-icon.svg
    const iconName = nameParts.slice(0, -2).join("-") + ".svg";

    const destPath = path.join(OUT_DIR, iconName);

    copyTasks.push(
      fs.copy(file, destPath).then(() => {
        console.log(`Copied ${iconName}`);
      })
    );
  }

  await Promise.all(copyTasks);

  // Cleanup
  await fs.remove(TMP_DIR);

  console.log(`✅ All SVGs 24px are in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
*/


/*
#!/usr/bin/env tsx
/!**
 * Script: git-icons.ts
 * Version: 1.1
 *
 * Description:
 *   Télécharge le repo Google Material Icons, récupère uniquement les SVG 24px,
 *   les copie dans "../icons" avec noms uniques, et nettoie le repo temporaire.
 *!/

import path from "path";
import fs from "fs-extra";
import simpleGit, { SimpleGit } from "simple-git";

const TMP_DIR = path.join(process.cwd(), "material-icons-temp");
const OUT_DIR = path.join(process.cwd(), "./icons");

async function main() {
  console.log("Starting Material Icons download...");

  // Cleanup old temp folder
  await fs.remove(TMP_DIR);
  await fs.ensureDir(TMP_DIR);
  await fs.ensureDir(OUT_DIR);

  const git: SimpleGit = simpleGit(TMP_DIR);

  // Initialize git
  await git.init();
  await git.addRemote("origin", "https://github.com/google/material-design-icons.git");
  await git.raw(["config", "core.sparseCheckout", "true"]);

  // Sparse checkout uniquement des SVG 24px
  const sparsePath = path.join(TMP_DIR, ".git", "info", "sparse-checkout");
  await fs.writeFile(sparsePath, "src/!*!/!*!/materialicons/24px.svg\n");

  // Détecter la branche par défaut
  const remoteInfo = await git.listRemote(["--symref", "origin", "HEAD"]);
  const match = remoteInfo.match(/ref: refs\/heads\/(\w+)\s+HEAD/);
  const defaultBranch = match ? match[1] : "master";
  console.log(`Detected default branch: ${defaultBranch}`);

  // Pull avec profondeur 1
  await git.pull("origin", defaultBranch, { "--depth": "1" });

  // Lire tous les dossiers dans src
  const srcPath = path.join(TMP_DIR, "src");
  const categories = (await fs.readdir(srcPath, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  // Parcourir les catégories et copier les SVG
  const copyTasks: Promise<void>[] = [];

  for (const cat of categories) {
    const catPath = path.join(srcPath, cat);
    const icons = (await fs.readdir(catPath, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const icon of icons) {
      const svgPath = path.join(catPath, icon, "materialicons", "24px.svg");
      if (await fs.pathExists(svgPath)) {
        // Nom unique : category-icon.svg
        const destPath = path.join(OUT_DIR, `${cat}-${icon}.svg`);
        copyTasks.push(
          fs.copy(svgPath, destPath).then(() => {
            console.log(`Copied ${cat}-${icon}.svg`);
          })
        );
      }
    }
  }

  // Attendre la fin de toutes les copies
  await Promise.all(copyTasks);

  // Cleanup
  await fs.remove(TMP_DIR);

  console.log(`✅ All SVGs 24px are in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
*/
