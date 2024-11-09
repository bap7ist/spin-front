import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonFooter,
  IonButton,
} from '@ionic/angular/standalone';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonFooter,
    IonButton,
    ReactiveFormsModule,
  ],
})
export class ChatComponent implements OnInit {
  public messages: string[] = [];
  public chatForm: FormGroup;

  public constructor(
    private chatService: ChatService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this._initForm();
    this.chatService.getNewMessage$().subscribe((message) => {
      this.messages.push(message);
    });
  }

  private _initForm() {
    this.chatForm = this.fb.group({
      message: [''],
    });
  }

  public onSubmit() {
    const message = this.chatForm.get('message')?.value;
    if (!message) return;
    this.chatService.sendMessage(message);
    console.log('Message envoyé:', message);
    this.chatForm.reset();
  }
}
