#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName: string;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
	const rainbowTitle = chalkAnimation.rainbow(figlet.textSync("Welcome to the game!"));

	await sleep();
	rainbowTitle.stop();

	console.log(`${chalk.bgBlue("HOW TO PLAY")}\n 
				I am a process on your computer. 
				If you get any question wrong I will be ${chalk.red("KILLED")}. 
				If you get all the questions right I will be ${chalk.green("SAVED")}.
	`);
}

async function askName() {
	const answers = await inquirer.prompt({
		name: "player_name",
		type: "input",
		message: "What is your name?",
		default() {
			return "Player";
		},
	});

	playerName = answers.player_name;
}

async function askQuestion1() {
	const answers = await inquirer.prompt({
		name: "question",
		type: "list",
		message: "When is the unix epoch?",
		choices: ["Mar 10, 1985", "Jan 1, 2000", "Jan 1, 1970", "Jan 1, 1980"],
	});

	return handleAnswer(answers.question === "Jan 1, 1970");
}

async function askQuestion2() {
	const answers = await inquirer.prompt({
		name: "question",
		type: "list",
		message: "Which of these is not a name for this symbol?: #",
		choices: ["Pound sign", "Hash tag", "Octothorp", "Crinkle"],
	});

	return handleAnswer(answers.question === "Crinkle");
}

async function askQuestion3() {
	const answers = await inquirer.prompt({
		name: "question",
		type: "list",
		message: "Which of these is not a real linux distribution?",
		choices: ["Arch", "Lime Wire", "Gentoo", "Manjaro"],
	});

	return handleAnswer(answers.question === "Lime Wire");
}

async function handleAnswer(isCorrect: boolean) {
	const spinner = createSpinner("Checking answer...").start();
	await sleep();

	if (isCorrect) {
		spinner.success({ text: `Good job ${playerName}!.` });
	} else {
		spinner.error({
			text: `Sorry ${playerName}. Game Over...\n Process ${chalk.bgRed("KILLED!")}`,
		});
		process.exit(1);
	}
}

function winner() {
	console.clear();
	const msg = `Congratulations ${playerName}!\nYou have saved\nthe process!`;

	figlet(msg, (err, data) => {
		console.log(gradient.pastel.multiline(data));
	});
}

await welcome();
await askName();
await askQuestion1();
await askQuestion2();
await askQuestion3();
winner();
