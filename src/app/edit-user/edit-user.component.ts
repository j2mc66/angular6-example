import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {UserService} from "../service/user.service";

import {User} from "../model/user.model";

import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.userService.getUserById(id).subscribe( data => {
          this.editForm.setValue(data);
        });
      }else{
        alert("Invalid action.")
        this.router.navigate(['list-user']);
        return;
      }
    });

  	
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [],
      username: [],
      password: [],
      salary: [],
    });
    
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}
