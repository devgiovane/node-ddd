import Observer from "../../infra/queue/Observer";
import DebitCommand from "../../application/command/DebitCommand";
import AccountRepository from "../repository/AccountRepository";

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
