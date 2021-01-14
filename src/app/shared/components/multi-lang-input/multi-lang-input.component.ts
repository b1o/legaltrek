import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-multi-lang-input',
	templateUrl: './multi-lang-input.component.html',
	styleUrls: ['./multi-lang-input.component.scss'],
})
export class MultiLangInputComponent implements OnInit {
	@Input() input = {
		bg_BG:
			'[\u0421\u0420] \u0441\u0440\u0435\u0449\u0430 \u0441 \u043a\u043b\u0438\u0435\u043d\u0442 \u043d\u0430 \u0442\u0435\u043c\u0430',
	};

  @Input() label = 'Description'

	public control: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit() {}

	splitLanguages() {
		this.control = this.fb.group({});
		Object.keys(this.input).map((lang) => {
			this.control.addControl(lang, this.fb.control(this.input[lang]));
		});
	}
}
