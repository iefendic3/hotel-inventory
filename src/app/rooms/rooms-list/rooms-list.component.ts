import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush //Mora biti IMMUTABLE -> this.list = [...list, newElement]
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rooms: RoomList[]  = [];

  @Input() title: string = '';

  @Input() price: number = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();
  
  constructor() { }
  ngOnDestroy(): void {
    console.log("on destroy")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {
  }

  selectRoom(room: RoomList){
    this.selectedRoom.emit(room);
  }

}
