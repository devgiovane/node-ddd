import Account from "./Account";

export default class AccountBuilder {
	public bank: string | undefined;
	public branch: string | undefined;
	public account: string | undefined;

	constructor(
		public readonly document: string
	) {
	}

	public setBank(bank: string): AccountBuilder {
		this.bank = bank;
		return this;
	}

	public setBranch(branch: string): AccountBuilder {
		this.branch = branch;
		return this;
	}

	public setAccount(account: string): AccountBuilder {
		this.account = account;
		return this;
	}

	public build(): Account {
		return new Account(this);
	}
}
