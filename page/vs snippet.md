 
vs获取当前文件名称
$TM_FILENAME_BASE

user snippet 找到JavaScriptreact 或者JavaScript 或者html
{
	// Place your snippets for javascriptreact here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"fori": {
		"prefix": "fori",
		"body": [
			"for(let i=0; i<len;i++){$1}",
			"$2"
		],
		"description": "for(let i=0; i<len;i++"
	},
	"forarr": {
		"prefix": "forarr",
		"body": [
			"for(let i=0; i<arr.length;i++){$1}",
			"$2"
		],
		"description": "for(let i=0; i<arr.length;i++"
	},
	"rcc": {
		"prefix": "rcc",
		"body": [
			"import React, { Component } from 'react'",
			"export default class  $TM_FILENAME_BASE extends Component {",
			"	render() {",
			"		return ($1)",
			"	}",
			"}"
		],
		"description": "react template"
	}
}
