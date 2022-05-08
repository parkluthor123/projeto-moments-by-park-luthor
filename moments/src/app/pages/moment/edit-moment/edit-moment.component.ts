import { MessagesService } from './../../../services/messages/messages.service';
import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service';
import { Moment } from 'src/app/interfaces/moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: Moment;
  btnText: string = "Editar";

  constructor(private momentService: MomentService, private route: ActivatedRoute, private router: Router, private messageService: MessagesService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((items)=> this.moment = items.data);

  }

  async editHandler(momentData: Moment)
  {
    const id = this.moment.id;
    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    if(momentData.image)
    {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messageService.add(`Momento ${momentData.id} editado com sucesso!`);
     this.router.navigate(["/"]);
  }

}
