import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"

const track = JSON.parse(readFileSync(new URL("./track.json", import.meta.url), "utf-8"))

const adaPath = join(homedir(), "code", "ada-tech", "bloc1", "projets")

if (!existsSync(adaPath)) {
  console.log(`❌ Le dossier ${adaPath} n'existe pas.`)
  process.exit(1)
}
console.log(`✅ Dossier ${adaPath} trouvé\n`)


let completeProjects = 0
for (const project of track.projects) {
  const projectPath = join(adaPath, project.name)

  if (!existsSync(projectPath)) {
    console.log(`❌ ${project.name} : dossier introuvable`)
    continue
  }

  const missing = project.required.filter((file) => !existsSync(join(projectPath, file)))
  const found = project.required.length - missing.length
  const percent = Math.round((found / project.required.length) * 100)

  if (missing.length === 0) {
    completeProjects++
    console.log(`✅ ${project.name} : complet (${found}/${project.required.length}) - ${percent}%`)
  } else {
    console.log(`⚠️  ${project.name} : ${found}/${project.required.length} fichiers - ${percent}%`)
    for (const file of missing) {
      console.log(`   - manquant : ${file}`)
    }
  }
}

const total = track.projects.length
const totalPercent = Math.round((completeProjects / total) * 100)
console.log(`\n📊 ${completeProjects}/${total} projets complets - ${totalPercent}%`)

process.exit(completeProjects === total ? 0 : 1)
