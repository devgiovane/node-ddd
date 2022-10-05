import AccountBuilder from "../builder/AccountBuilder";
import Transaction from "./Transaction";

export default class Account {
	private readonly bank: string | undefined;
	private readonly branch: string | undefined;
	private readonly account: string | undefined;
	public readonly document: string;
	private readonly transactions: Transaction[];

	constructor(accountBuilder: AccountBuilder) {
		this.transactions = [];
		this.bank = accountBuilder.bank;
		this.branch = accountBuilder.branch;
		this.account = accountBuilder.account;
		this.document = accountBuilder.document;
	}

	public credit(amount: number): void {
		this.transactions.push(new Transaction("credit", amount));
	}

	public debit(amount: number): void {
		this.transactions.push(new Transaction("debit", amount));
	}

	public getBalance(): number {
		let balance = 0;
		for (const transaction of this.transactions) {
			if (transaction.type === "credit") {
				balance += transaction.amount;
			}
			if (transaction.type === "debit") {
				balance -= transaction.amount;
			}
		}
		return balance;
	}
}
