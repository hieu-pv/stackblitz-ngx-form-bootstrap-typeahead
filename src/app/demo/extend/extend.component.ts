import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgxFormGroup } from "@ngxform/platform";
import { Validators } from "@angular/forms";
import {
  NgxBootstrapTypeaheadControl,
  WindowTemplateContext
} from "@ngxform/ng-bootstrap-typeahead";
import { delay } from "rxjs/internal/operators";
import { of, Subject } from "rxjs";

@Component({
  selector: "app-extend",
  templateUrl: "./extend.component.html",
  styleUrls: ["./extend.component.scss"]
})
export class ExtendComponent implements OnInit {
  public demoForm: NgxFormGroup;

  @ViewChild("windowTemplate", { static: true }) windowTemplate: TemplateRef<
    WindowTemplateContext
  >;

  ngOnInit(): void {
    const typeaheadOptions: { name: string; flag: string }[] = [
      {
        name: "Alabama",
        flag: "5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png"
      },
      {
        name: "Alaska",
        flag: "e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png"
      },
      {
        name: "Arizona",
        flag: "9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png"
      },
      {
        name: "Arkansas",
        flag: "9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png"
      },
      {
        name: "California",
        flag: "0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png"
      },
      {
        name: "Colorado",
        flag: "4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png"
      },
      {
        name: "Connecticut",
        flag: "9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png"
      },
      {
        name: "Delaware",
        flag: "c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png"
      },
      {
        name: "Florida",
        flag: "f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png"
      }
    ];

    const showFocus = new Subject<boolean>();

    this.demoForm = new NgxFormGroup({
      typeahead: new NgxBootstrapTypeaheadControl(
        "",
        [Validators.required],
        [],
        {
          label: "NgBootstrap Typeahead",
          controlClass: ["form-control"],
          ngClass: "d-flex flex-column form-group",
          options: typeaheadOptions,
          defaultValue: typeaheadOptions[0],
          inputFormatter: (item: any) => item.name,
          openOnFocus: true,
          fullWithWindow: true,
          focus: showFocus,
          errorMessages: [
            { key: "required", message: "This field is required" }
          ]
        }
      )
    });

    of(true)
      .pipe(delay(5000))
      .subscribe(val => {
        showFocus.next(true);
      });
  }

  onSubmit(): void {
    this.demoForm.submitted = true;
    console.log(this.demoForm.value);
  }
}
