import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MovieProvider]
})
export class FilmeDetalhesPage {
  public filme;
  public filmeId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider: MovieProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad FilmeDetalhesPage');

    this.filmeId = this.navParams.get('id');

    this.movieProvider.getMovieDetails(this.filmeId).subscribe(
      data => {
        let retorno = (data as any);
        this.filme = retorno;
      },
      error => {
        console.log(`Erro ao tentar recuperar detalhes do filme.`);
      }
    )
  }

}
