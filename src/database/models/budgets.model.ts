import { BudgetType } from '../../types/Budget';

class Budget implements BudgetType {
	id: string | number;
	user_id: string | number;
	title: string;
	constructor(id: string | number = null, user_id: string | number = null, title: string = null) {
		this.id = id;
		this.user_id = user_id;
		this.title = title;
	}
}

export { Budget };
