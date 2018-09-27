import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public obj_feed = {
    usuario: 'Devair',
    data: 'November 5, 1955',
    descricao: 'Hello world IONIC!',
    qtd_likes: 12,
    qtd_comentarios: 4,
    hora_comentario: '11h ago'
  };

  public nome_usuario:string = 'DevA';

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider) {
  }

  public somaDoisNumeros(num1:number, num2:number):void {
    alert(num1 + num2);
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
    console.log('ionViewDidLoad FeedPage');
  }

}
