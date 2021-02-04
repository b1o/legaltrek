import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormBuilder,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
	selector: 'app-multi-lang-input',
	templateUrl: './multi-lang-input.component.html',
	styleUrls: ['./multi-lang-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MultiLangInputComponent),
			multi: true,
		},
	],
})
export class MultiLangInputComponent
	implements OnInit, OnChanges, ControlValueAccessor {
	@Input() input  = "";
	@Input() canEdit = false;
	@Input() label = 'Description';

	public focused = false;
	public currentLanguage = null;
	public languages = [];
	public parsedInput;

	public onChange = (value) => {};
	public onTouch = () => {};
	public disabled = false;

	constructor(
		private cd: ChangeDetectorRef,
		private authService: AuthService
	) {
		this.input = this.authService.user.languages;
		this.parsedInput = this.input;
		this.currentLanguage = Object.keys(this.input)[0];
	}

	writeValue(obj: any): void {
		if (obj) {
			this.input = obj;
			this.splitLanguages();
		}
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges) {}

	selectLanguage(lang) {
		this.currentLanguage = lang;
		this.cd.detectChanges();
	}

	onTextChange(event: KeyboardEvent) {
		this.parsedInput[this.currentLanguage] = event.target['value'];
		this.onChange(JSON.stringify(this.parsedInput));
	}

	splitLanguages() {
		try {
			this.parsedInput = JSON.parse(this.input);
			this.currentLanguage = Object.keys(this.parsedInput)[0];
			this.cd.detectChanges();
		} catch (e) {
			this.parsedInput = null;
		}
	}
}
