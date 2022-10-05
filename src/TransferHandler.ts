import Observer from "./Observer";
import AccountRepository from "./AccountRepository";
import TransferCommand from "./TransferCommand";
import TransferService from "./TransferService";

export default class TransferHandler implements Observer {
	operation = "transfer";

	constructor(
		private accountRepository: AccountRepository
	) {
	}

	public notify(command: TransferCommand): void {
		const accountFrom = this.accountRepository.get(command.documentFrom);
		const accountTo = this.accountRepository.get(command.documentTo);
		if (accountFrom && accountTo) {
			const transferService = new TransferService();
			transferService.transfer(accountFrom, accountTo, command.amount);
		}
	}

}
