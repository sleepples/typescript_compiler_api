export var task_list: [Task, number][] = [];
var master: HTMLElement | null = document.getElementById("master");

function new_hash(input: string): string {
	return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

export class Task {
	private readonly id: string;
	private parent_task: HTMLElement;
	private title: HTMLDivElement;
	private description: HTMLDivElement;
	private check_box: HTMLInputElement;

	public name: string;
	public desc: string;
	public pos: number;

	constructor(name: string, desc: string, pos: number) {
		this.name = name;
		this.desc = desc;
		this.pos = pos;
		this.id = new_hash(this.name.concat(this.desc));

		if (!task_list.some(v => v[0].id==this.id)) {
			task_list.push([this, this.pos]);
		}
		
		if (master == null) {
			throw new Error("there is no div with the id master");
		}

		this.parent_task = master.appendChild(document.createElement("task"));
		this.parent_task.style.display = "none";

		this.check_box = this.parent_task.appendChild(document.createElement("input"));
		let check_mark = this.parent_task.appendChild(document.createElement("span"));
		this.title = this.parent_task.appendChild(document.createElement("div"));
		this.description = this.parent_task.appendChild(document.createElement("div"));

		this.check_box.setAttribute("type", "checkbox");
		this.check_box.classList.add("checkbox");
		this.check_box.tabIndex = -1;
		this.check_box.addEventListener("click", () => {this.toggle_checked(this.check_box.checked)});

		check_mark.classList.add("checkmark");

		this.title.classList.add("title");
		this.title.contentEditable = "true";
		this.title.innerHTML = this.name;

		this.description.classList.add("description");
		this.description.contentEditable = "true";
		this.description.innerHTML = this.desc;
	}

	hide(): void {
		this.parent_task.style.display = "none";
	}

	show(): void {
		this.parent_task.style.display = "block"
	}

	delete_task(): void {
		master?.removeChild(this.parent_task);
		task_list.some((value: [Task, number], index: number) => {
			if (value[0].id == this.id) {
				task_list.splice(index, 1);
			}
		});
	}

	append_to_end(master: Element): void {
		master.appendChild(this.parent_task);
	}

	toggle_checked(checked: boolean): void {
		if (checked) {
			this.title.style.textDecoration = "line-through";
			this.title.style.color = "#777777";
		} else {
			this.title.style.textDecoration = "none";
			this.title.style.color = "#000000";
		}
		this.title.contentEditable = `${!checked}`;
	}
}

export function sort_task_list(): void {
	task_list = task_list.sort((a, b) => {
		if (a[1] > b[1]) {
			return 1;
		} else if (a[1] < b[1]) {
			return -1;
		} else {
			return 0;
		}
	});
}