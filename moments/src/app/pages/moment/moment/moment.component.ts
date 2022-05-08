import { MessagesService } from './../../../services/messages/messages.service';
import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service';
import { Moment } from 'src/app/interfaces/moment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment/comment.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  baseAPIURL = environment.baseImageUrl;

  moment?: Moment;

  faTimes = faTimes;
  faEdit  = faEdit;

  commentForm!: FormGroup;

  constructor(private momentService: MomentService, private messageService: MessagesService, private route: ActivatedRoute, private router: Router, private commentService: CommentService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((items)=> this.moment = items.data);

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    })

  }

  async removeHandler(id: number) 
  {
    await this.momentService.removeMoment(id).subscribe();

    this.messageService.add("Momento excluído com sucesso!");

    this.router.navigate(["/"]);
  }

  get text()
  {
    return this.commentForm.get('text')!;
  }

  get username()
  {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective: FormGroupDirective)
  {
      if(this.commentForm.invalid)
      {
        return;
      }

      const data: Comment = this.commentForm.value;

      data.momentId = Number(this.moment!.id)

      await this.commentService.createComment(data).subscribe((comment)=>{
        return this.moment!.comments!.push(comment.data);
      });

      this.messageService.add("Comentário adicionado!");

      //reseto o form
      this.commentForm.reset();

      formDirective.resetForm();
  }

}
