"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort_task_list = exports.Task = exports.task_list = void 0;
exports.task_list = [];
var master = document.getElementById("master");
function new_hash(input) {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}
var Task = /** @class */ (function () {
    function Task(name, desc, pos) {
        var _this = this;
        this.name = name;
        this.desc = desc;
        this.pos = pos;
        this.id = new_hash(this.name.concat(this.desc));
        if (!exports.task_list.some(function (v) { return v[0].id == _this.id; })) {
            exports.task_list.push([this, this.pos]);
        }
        if (master == null) {
            throw new Error("there is no div with the id master");
        }
        this.parent_task = master.appendChild(document.createElement("task"));
        this.parent_task.style.display = "none";
        this.check_box = this.parent_task.appendChild(document.createElement("input"));
        var check_mark = this.parent_task.appendChild(document.createElement("span"));
        this.title = this.parent_task.appendChild(document.createElement("div"));
        this.description = this.parent_task.appendChild(document.createElement("div"));
        this.check_box.setAttribute("type", "checkbox");
        this.check_box.classList.add("checkbox");
        this.check_box.tabIndex = -1;
        this.check_box.addEventListener("click", function () { _this.toggle_checked(_this.check_box.checked); });
        check_mark.classList.add("checkmark");
        this.title.classList.add("title");
        this.title.contentEditable = "true";
        this.title.innerHTML = this.name;
        this.description.classList.add("description");
        this.description.contentEditable = "true";
        this.description.innerHTML = this.desc;
    }
    Task.prototype.hide = function () {
        this.parent_task.style.display = "none";
    };
    Task.prototype.show = function () {
        this.parent_task.style.display = "block";
    };
    Task.prototype.delete_task = function () {
        var _this = this;
        master === null || master === void 0 ? void 0 : master.removeChild(this.parent_task);
        exports.task_list.some(function (value, index) {
            if (value[0].id == _this.id) {
                exports.task_list.splice(index, 1);
            }
        });
    };
    Task.prototype.append_to_end = function (master) {
        master.appendChild(this.parent_task);
    };
    Task.prototype.toggle_checked = function (checked) {
        if (checked) {
            this.title.style.textDecoration = "line-through";
            this.title.style.color = "#777777";
        }
        else {
            this.title.style.textDecoration = "none";
            this.title.style.color = "#000000";
        }
        this.title.contentEditable = "".concat(!checked);
    };
    return Task;
}());
exports.Task = Task;
function sort_task_list() {
    exports.task_list = exports.task_list.sort(function (a, b) {
        if (a[1] > b[1]) {
            return 1;
        }
        else if (a[1] < b[1]) {
            return -1;
        }
        else {
            return 0;
        }
    });
}
exports.sort_task_list = sort_task_list;
