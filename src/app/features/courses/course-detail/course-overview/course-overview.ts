import { Component, signal } from "@angular/core";

@Component({
  selector: "app-course-overview",
  templateUrl: "./course-overview.html",
  imports: [],
})
export class CourseOverview {
  info = signal(`
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni pariatur
    consequatur quas odio architecto eligendi porro laboriosam illo ipsa,
    praesentium nihil accusamus, nesciunt est temporibus incidunt ipsum vitae.
    Cumque, nostrum. Ratione eos beatae minus labore quod. Qui temporibus
    quibusdam neque velit labore dolorum vitae! Facere quibusdam libero voluptatum
    tempora repudiandae mollitia quos, deserunt corrupti ipsa voluptatibus quaerat
    nihil distinctio tenetur eligendi officiis assumenda. Ratione, impedit
    aspernatur, quidem placeat voluptatibus obcaecati facilis ab laudantium magnam
    perferendis expedita et at numquam maiores! Accusamus nisi tempora maiores aut
    praesentium beatae, eum cumque? Reiciendis illum cupiditate temporibus
    asperiores repudiandae tempore obcaecati expedita. Aliquid, enim.
  `);
}
