import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCarrinhoComponent } from './listagem-carrinho.component';

describe('ListagemCarrinhoComponent', () => {
  let component: ListagemCarrinhoComponent;
  let fixture: ComponentFixture<ListagemCarrinhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemCarrinhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
