
const Path = require('path');
const Ejs = require('ejs');
const Fs = require('fs');

function RenderFile(templateFilePath, outputFilePath, pageName, subFolder)
{
	console.log(templateFilePath, "->", outputFilePath);

	//render selected file
	Ejs.renderFile(templateFilePath,
		{PageData: {
			IsDevMode:IsDevMode,
			PageName: Path.join(subFolder.Folder, pageName),
			PathToRoot: subFolder.PathToRoot
		}},

		function(renderError, builtHtml) {

		// error handling
		if (renderError)
		{
			console.log(renderError);
			return;
		}


		// write rendered page to output path
		Fs.writeFile(outputFilePath, builtHtml, function (fileError) {

			// error handling
			if (fileError)
			{
				console.log(fileError);
				return;
			}
		});
	});
}

function TryMakeDir(path)
{
	try {
		Fs.mkdirSync(path)
	} catch (err) {
		if (err.code !== 'EEXIST') throw err
	}
}

function ConvertAllTemplates(subFolder)
{
	let templatesFolder = Path.join(TemplatesFolder, subFolder.Folder);
	Fs.readdir(templatesFolder, function (error, files) {
		// error handling
		if (error)
		{
			console.log('Unable to scan directory: ' + error);
			return;
		}

		//iterate over all sub files
		files.forEach(function(fileName) {

			let templateFilePath = Path.join(templatesFolder, fileName);
			let stat = Fs.statSync(templateFilePath);

			// we can only render files not folders
			if (stat.isFile())
			{
				let pageName = fileName;
				let lastDotIndex = pageName.lastIndexOf(".");
				if (lastDotIndex >= 0)
				{
					pageName = pageName.slice(0, lastDotIndex);
				}
				let outputFile = pageName + ".html";
				outputFile = Path.join(subFolder.Folder, outputFile);

				TryMakeDir(Path.join(OutputFolder, subFolder.Folder))

				let outputFilePath = Path.join(OutputFolder, outputFile);

				RenderFile(templateFilePath, outputFilePath, pageName, subFolder);
			}

		});
	});
}

const TemplatesFolder = "Views/"
const SubFolders = [{Folder:"", PathToRoot:""}]
const OutputFolder = "../"
let IsDevMode = true;

console.log("=".repeat(20));

if (process.argv.includes("Release"))
{
	IsDevMode = false;
	console.log("Building pages for Release");
}
console.log("IsDevMode: ", IsDevMode);

console.log("=".repeat(20));
console.log();


for (let i = 0; i < SubFolders.length; i++)
{
	ConvertAllTemplates(SubFolders[i]);
}