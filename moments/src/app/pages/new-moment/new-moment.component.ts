import { MomentService } from './../../services/moment/moment.service';
import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/interfaces/moment';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  btnText: string = 'Compartilhar!';

  async createHandler(event: Moment){
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.description);

    if(event.image){
      formData.append('image', event.image);
    }
    
    await this.momentService.createMoment(formData).subscribe();

    this.messageService.add('Momento criado com sucesso!');
    this.router.navigate(['/']);
  }
}
