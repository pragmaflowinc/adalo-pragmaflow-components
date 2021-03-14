var path = require('path')
var fs = require('fs')

const defaultInterfaces = `interface IStyles {
  fontFamiy: String
  fontSize: Number
  fontWeight: Number
  textAlignment: String
  color: String
}

interface IFonts {
  body: String
  heading: String
}
`


function parseProp(prop) {
  const ret = []
  if (prop.type === 'boolean') {
    ret.push(`  ${prop.name}?: Boolean`)
  } else if (prop.type === 'text' || prop.type === 'color' || prop.type === 'icon' || prop.type === 'image') {
      ret.push(`  ${prop.name}?: String`)
    } else if (prop.type === 'number') {
      ret.push(`  ${prop.name}?: Number`)
    } else if (prop.type === 'list') {
      ret.push(`  ${prop.name}?: I${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}[]`)
    } else if (prop.type === 'action') {
      const builder = []
      builder.push(`${prop.name}?: (`)
      if (prop.arguments) {
        prop.arguments.map(arg => {
          builder.push(`${arg.displayName.replace(' ', '')}?: `)
          if (arg.type === 'text') {
            builder.push('String')
          } else if (arg.type === 'number') {
            builder.push('Number')
          }
        })
      }
      builder.push(`) => void`)
      ret.push(`  ${builder.join('')}`)
    }
    if (prop.styles) {
      ret.push(`  styles: { ${prop.name}: IStyles }`)
    }
    return ret.join('\n')
}

function recursiveSearch(folder, filename, files, output) {
  files = files || fs.readdirSync(folder)
  output = output || []

  files.forEach(file => {
    const newPath = path.join(folder, file)
    if (fs.statSync(newPath).isDirectory()) {
      output = recursiveSearch(newPath, filename, fs.readdirSync(newPath), output)
    } else {
      if (file === filename) {
        output.push(newPath)
      }
    }
  })
  return output
}

const manifests = recursiveSearch('./src', 'manifest.json')

manifests.forEach(manifestFilename => {
  const fileOutputter = []
  fileOutputter.push(`/*********** Manifest Props *******************`)
  fileOutputter.push(` * This file is auto generated, making manual *`)
  fileOutputter.push(` * edits to this file might result in loosing *`)
  fileOutputter.push(` * information.                               *`)
  fileOutputter.push(` **********************************************/`)
  const referencedInterfaces = {}
  fileOutputter.push(`${defaultInterfaces}`)
  const mainInterface = []
  const interface = []
  const jsonString = fs.readFileSync(manifestFilename)
  const manifest = JSON.parse(jsonString)

  mainInterface.push(`export interface ${manifest.displayName.replace(' ', '')}Props {`)
  if (manifest.childComponents) {
    manifest.childComponents.map(childComponent => {
      const childComponentInterfaceName = `I${childComponent.name.charAt(0).toUpperCase() + childComponent.name.slice(1)}`
      if (childComponent.reference) {
        if (!referencedInterfaces[childComponent.reference]) {
          referencedInterfaces[childComponent.reference] = []
        }
        referencedInterfaces[childComponent.reference].push(`  ${childComponent.name}?: ${childComponentInterfaceName}`)
        interface.push(`export interface ${childComponentInterfaceName} {`)
        childComponent.props.forEach(prop => interface.push(parseProp(prop)))
        interface.push(`}`)
        interface.push(``)
      } else {
        interface.push(`export interface ${childComponentInterfaceName} {`)
        childComponent.props.forEach(prop => interface.push(parseProp(prop)))
        interface.push(`}`)
        interface.push(``)
        mainInterface.push(`  ${childComponent.name}?: ${childComponentInterfaceName}`)
      }
    })
  }
  manifest.props.forEach(prop => mainInterface.push(parseProp(prop)))
  mainInterface.push(`  appId: String`)
  mainInterface.push(`  _fonts: IFonts`)
  mainInterface.push(`  _width: Number`)
  mainInterface.push(`  _height: Number`)
  mainInterface.push(`  editor: Boolean`)
  mainInterface.push(`}`)
  fileOutputter.push(interface.join('\n'))

  Object.keys(referencedInterfaces).map(ri => {
    fileOutputter.push(`export interface I${ri.charAt(0).toUpperCase() + ri.slice(1)} {`)
    fileOutputter.push(referencedInterfaces[ri].join('\n'))
    fileOutputter.push(`}\n`)
  })

  fileOutputter.push(mainInterface.join('\n'))
  const generatedFileName = manifestFilename.replace('manifest.json', 'generated.ts')
  if (fs.existsSync(generatedFileName)) {
    fs.unlinkSync(generatedFileName)
  }
  fs.writeFileSync(generatedFileName, fileOutputter.join('\n'))
  console.log(`Generated file for ${manifestFilename}`)
})
