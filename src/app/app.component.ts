import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unstoptest';
  coach = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2];
  numSeats: number = 1;
  bookedAt: number[] = [];

  reserveSeats() {
    const sum = this.coach.reduce((val, next) => val + next);
    if (sum === 0) {
      alert(`Coach is completely booked, No seats available!!`);
    }
    if (this.numSeats > sum) {
      alert(`Only ${sum} seats are available`);
    } else {
      this.assinSeats(this.numSeats, false);
      alert(
        `Your seat booked in row ${this.bookedAt.join(
          ','
        )}, available seat slot pairs are ${this.coach}`
      );
    }
  }

  assinSeats(slot: number, together = false) {
    if (slot >= 7) {
      const rowConsistFullRow = this.coach.findIndex((s) => s === 7);
      this.coach[rowConsistFullRow] -= 7;
      slot -= 7;
      this.bookedAt.push(rowConsistFullRow + 1);
      if (slot > 0) this.assinSeats(slot, true);
    } else {
      const rowWithRemainSeats = this.coach.findIndex((s) => s + slot <= 7);
      if (!together && rowWithRemainSeats && rowWithRemainSeats !== 11) {
        this.coach[rowWithRemainSeats] -= slot;
        this.bookedAt.push(rowWithRemainSeats + 1);
      } else if (
        (!together && this.coach[11] === 3) ||
        this.coach[11] + slot <= 3
      ) {
        this.coach[11] -= slot;
        this.bookedAt.push(rowWithRemainSeats + 1);
      } else {
        if (together) {
          this.coach[this.bookedAt.length] -= slot;
        } else {
          const rowConsistFullRow = this.coach.findIndex((s) => s === 7);
          this.coach[rowConsistFullRow] -= 3;
          slot -= 3;
          this.bookedAt.push(rowConsistFullRow);
          if (slot > 0) this.assinSeats(slot, true);
        }
      }
    }
  }
}
