import { HttpEventType } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, QueryList, SimpleChanges, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../services/config.service';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hotelName = "Hilton Hotel";
  numberOfRooms = 10;
  hideRooms = true;

  selectedRoom!: RoomList;
  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }

  title = 'Room List';

  roomList: RoomList[] = []

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    //observer.error('error')
  })

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>

  //roomService = new RoomsService();

  constructor(@SkipSelf() private roomsService: RoomsService,
  private configSerivce: ConfigService) { }


  ngAfterViewChecked(): void {

  }

  ngAfterViewInit(): void {

    this.headerChildrenComponent.forEach((child, index) => {
      if (index === 1)
        child.title = "Second Rooms View",
          console.log(index);
    });
    this.headerChildrenComponent.first.title = "First Rooms View"
    this.headerChildrenComponent.last.title = "Last Rooms View"
  }

  totalBytes = 0;

  subscription !: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      //console.log(err);
      this.error$.next(err.message);
      return of([]);
    }
    )
  );

  priceFilter: FormControl = new FormControl('0');

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )
  ngOnInit(): void {
    
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Request made!")
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log("Request success!")
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body)
        }
      }
    })

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    })
    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // })

  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List"
  }
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner',
      price: 500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('11-Dec-2021'),
      rating: 4.5,
    }
    //this.roomList.push(room);
    //  this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    }
    )
  }
  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner',
      price: 500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('11-Dec-2021'),
      rating: 4.5,
    }
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }
  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
