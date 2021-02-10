import { BudgetType } from '../../types/Budget';

class Budget implements BudgetType {
	id: string | number;
	user_id: string | number;
	constructor(id: string | number = null, user_id: string | number = null) {
		this.id = id;
		this.user_id = user_id;
	}
}

export { Budget };
