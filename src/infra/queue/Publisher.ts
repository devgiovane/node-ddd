import Observer from "./Observer";
import Command from "../../application/command/Command";

export default class Publisher {
	private readonly observers: Observer[];

	constructor() {
		this.observers = []
	}

	public register(observer: Observer): void {
		this.observers.push(observer);
	}

	public publish(command: Command) {
		for (const observer of this.observers) {
			if (observer.operation === command.operation) {
				observer.notify(command);
			}
		}
	}

}
