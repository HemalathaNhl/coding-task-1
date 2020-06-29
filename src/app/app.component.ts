import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  empName = "";
  url;
  countComment = 1;
  indexComment = 10;
  countWorkExp = 1;
  
  // Displaying Employee Photograph
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  // Employment details section
  addWorkExperience() {
    if(this.countWorkExp < 3) {
      this.countWorkExp++;
      var empExp = document.getElementById("work1");
      var newEmpExp = <HTMLElement>empExp.cloneNode(true);
      document.getElementById("emp-work-details").appendChild(newEmpExp);
      newEmpExp.id = `work${this.countWorkExp}`;
      (<HTMLTextAreaElement>(newEmpExp.getElementsByClassName("org")[0]).childNodes[1]).value = "";
      (<HTMLInputElement>newEmpExp.getElementsByClassName("from")[0].childNodes[1]).value = "yyyy-mm-dd";
      (<HTMLInputElement>newEmpExp.getElementsByClassName("to")[0].childNodes[1]).value = "yyyy-mm-dd";
    } 
  }
  // Comments section
  addComment() {
    if(this.countComment < 5) {
      this.countComment++;
      this.indexComment++;
      var comment = document.getElementById("comment1");
      var newComment = <HTMLElement>comment.cloneNode(true);
      document.getElementById("comments-section").appendChild(newComment);
      newComment.id = `comment${this.indexComment}`;
      (<HTMLTextAreaElement>newComment.getElementsByClassName("comment-text")[0]).value = "";
      newComment.getElementsByClassName("edit-comment")[0].addEventListener("click", this.editComment.bind(this));
      newComment.getElementsByClassName("delete-comment")[0].addEventListener("click", this.deleteComment.bind(this));
    }
  }
  editComment(event) {
    var ele = document.getElementById(`${event.target.parentNode.id}`);
    (<HTMLElement>ele.firstChild).focus();
  }
  deleteComment(event) {
    this.countComment--;
    var ele = document.getElementById(`${event.target.parentNode.id}`);
    document.getElementById("comments-section").removeChild(ele);
  }
}