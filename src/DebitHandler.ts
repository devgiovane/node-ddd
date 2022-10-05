import Observer from "./Observer";
import DebitCommand from "./DebitCommand";
import AccountRepository from "./AccountRepository";

export default class DebitHandler implements Observer {
	operation = "debit";

	constructor(
		private accountRepository: AccountRepository
	) {
	}

	public notify(command: DebitCommand): void {
		const account = this.accountRepository.get(command.document);
		if (account) {
			account.debit(command.amount);
		}
	}

}
