import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPessoalComponent } from './cadastro-pessoal.component';

describe('CadastroPessoalComponent', () => {
  let component: CadastroPessoalComponent;
  let fixture: ComponentFixture<CadastroPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroPessoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
