import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonContent,
  IonButton,
  IonItemOptions,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonItemSliding,
  IonItemOption,
  IonButtons,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, trashOutline } from 'ionicons/icons';

interface Conversation {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent,
    IonItemOptions,
    IonSearchbar,
    RouterModule,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOption,
    IonAvatar,
  ],
})
export class ChatsPage implements OnInit {
  conversations: Conversation[] = [];
  filteredConversations: Conversation[] = [];
  searchTerm: string = '';

  public constructor(private router: Router) {
    addIcons({ chevronBackOutline, trashOutline });
  }

  ngOnInit() {
    // Initialisation des conversations avec des données simulées
    this.conversations = [
      {
        id: '1',
        name: 'John Doe',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        lastMessage: 'Hey, how are you?',
      },
      {
        id: '2',
        name: 'Jane Smith',
        avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
        lastMessage: "Let's catch up soon!",
      },
      {
        id: '3',
        name: 'Alice Johnson',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
        lastMessage: 'Can you send me the report?',
      },
      {
        id: '4',
        name: 'Bob Brown',
        avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
        lastMessage: 'Are you coming to the party?',
      },
      {
        id: '5',
        name: 'Charlie Davis',
        avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
        lastMessage: 'I will call you later.',
      },
      {
        id: '6',
        name: 'Diana Evans',
        avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
        lastMessage: 'Meeting at 3 PM.',
      },
      {
        id: '7',
        name: 'Ethan Foster',
        avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
        lastMessage: 'Check your email.',
      },
      {
        id: '8',
        name: 'Fiona Green',
        avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
        lastMessage: 'Happy Birthday!',
      },
      {
        id: '9',
        name: 'George Harris',
        avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
        lastMessage: 'See you tomorrow.',
      },
      {
        id: '10',
        name: 'Hannah Ingram',
        avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
        lastMessage: 'Thanks for your help.',
      },
      {
        id: '11',
        name: 'Ian Jackson',
        avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
        lastMessage: 'Let me know.',
      },
      {
        id: '12',
        name: 'Julia King',
        avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
        lastMessage: 'What do you think?',
      },
      {
        id: '13',
        name: 'Kevin Lewis',
        avatarUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        lastMessage: 'I agree with you.',
      },
      {
        id: '14',
        name: 'Laura Martinez',
        avatarUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
        lastMessage: 'Can we reschedule?',
      },
      {
        id: '15',
        name: 'Michael Nelson',
        avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        lastMessage: 'I will be there soon.',
      },
      {
        id: '16',
        name: 'Nina Owens',
        avatarUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
        lastMessage: 'Let’s do it!',
      },
      {
        id: '17',
        name: 'Oscar Perez',
        avatarUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
        lastMessage: 'I am on my way.',
      },
      {
        id: '18',
        name: 'Paula Quinn',
        avatarUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
        lastMessage: 'Good luck!',
      },
      {
        id: '19',
        name: 'Quincy Roberts',
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        lastMessage: 'See you later.',
      },
      {
        id: '20',
        name: 'Rachel Scott',
        avatarUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
        lastMessage: 'Thank you!',
      },
    ];
    this.filteredConversations = this.conversations;
  }

  onSearchInput(event: any) {
    const term = event.target.value.toLowerCase();
    this.filteredConversations = this.conversations.filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(term) ||
        conversation.lastMessage.toLowerCase().includes(term)
    );
  }

  openChat(conversationId: string) {
    // Logique pour ouvrir une conversation spécifique
    this.router.navigate(['tabs/feed/chat', conversationId]);
  }

  deleteConversation(conversationId: string) {
    this.conversations = this.conversations.filter(
      (conversation) => conversation.id !== conversationId
    );
    this.filteredConversations = this.filteredConversations.filter(
      (conversation) => conversation.id !== conversationId
    );
  }

  public goBack(): void {
    this.router.navigate(['tabs/feed']);
  }
}
