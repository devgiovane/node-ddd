import Publisher from "./Publisher";
import CreditHandler from "./CreditHandler";
import DebitHandler from "./DebitHandler";
import TransferHandler from "./TransferHandler";
import AccountRepositoryMemory from "./AccountRepositoryMemory";
import AccountApplicationService from "./AccountApplicationService";

let service: AccountApplicationService;

beforeEach(function () {
	const publisher = new Publisher();
	const accountRepository = new AccountRepositoryMemory();
	publisher.register(new CreditHandler(accountRepository));
	publisher.register(new DebitHandler(accountRepository));
	publisher.register(new TransferHandler(accountRepository));
	service = new AccountApplicationService(publisher, accountRepository);
});

test("should create account", function () {
	const document = "111.111.111-11";
	service.create(document);
	const account = service.get(document);
	expect(account.getBalance()).toBe(0);
});

test("should create account with deposit", function () {
	const document = "111.111.111-11";
	service.create(document);
	service.credit(document, 1000);
	const account = service.get(document);
	expect(account.getBalance()).toBe(1000);
});

test("should create account with debit", function () {
	const document = "111.111.111-11";
	service.create(document);
	service.credit(document, 1000);
	service.debit(document, 500);
	const account = service.get(document);
	expect(account.getBalance()).toBe(500);
});

test("should create two accounts and make transfer", function () {
	const documentFrom = "111.111.111-11";
	const documentTo = "222.222.222-22";
	service.create(documentFrom);
	service.credit(documentFrom, 1000);
	service.create(documentTo);
	service.credit(documentTo, 500);
	service.transfer(documentFrom, documentTo, 700);
	const accountFrom = service.get(documentFrom);
	const accountTo = service.get(documentTo);
	expect(accountFrom.getBalance()).toBe(300);
	expect(accountTo.getBalance()).toBe(1200);
});
