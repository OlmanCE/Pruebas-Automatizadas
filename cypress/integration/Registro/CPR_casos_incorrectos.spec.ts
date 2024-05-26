describe('Casos de prueba de Registro', () => {
    beforeEach(() => {
      // Visit the Discourse page before each test
      cy.visit('http://192.168.1.101/latest');
      // Click on the "Sign Up" button
      cy.contains('Sign Up').click();
    });

    it('CPR-01 Caso de prueba correcto', () => {
      // Ingresar el nombre de usuario y la contraseña
      cy.get('#new-account-email').type('fafaafafag4@hotmail.com'); // Cambié el nombre de el email y del username traté probarlo sin
      cy.get('#new-account-username').type('charlcrak222');        //Ejecutar el caso de prueba primero y los valores ya no eran únicos
      cy.get('#new-account-name').type('Carlos Solís');
      cy.get('#new-account-password').type('contras"#$%&/()=?231');
  
      // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
      cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/div[2]/button[1]').wait(2000).click();

      cy.wait(2000);

      cy.url().should('include', '/account-created'); // Adjust this URL path based on actual navigation

      cy.contains('Welcome to Discourse!').should('be.visible'); 

    });
  
    it('CPR-02 Caso incorrecto  por campo vacío de Password', () => {
      // Fill out the sign-up form without the password
      cy.get('#new-account-email').type('casoliss05@r.com');
      cy.get('#new-account-username').type('Charlitox');
      cy.get('#new-account-name').type('Carlos Solís');
  
      // Click the sign-up button
      cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/div[2]/button[1]').click();
  
      // Validate that the password validation message is displayed
      cy.get('#password-validation').should('be.visible').and('contain.text', 'Please enter a password');
    });

    it('CPR-03 Caso incorrecto  por muy pocos caracteres en Password', () => {
        // Fill out the sign-up form without the password
        cy.get('#new-account-email').type('casoliss05@r.com');
        cy.get('#new-account-username').type('Charlitox');
        cy.get('#new-account-name').type('Carlos Solís');
        cy.get('#new-account-password').type('la');
    
        // Validate that the password validation message is displayed
        cy.get('#password-validation').should('be.visible').and('contain.text', 'Your password is too short.');
      });

      it('CPR-04 Caso incorrecto  por demasiados caracteres en Password', () => {
        // Fill out the sign-up form without the password
        cy.get('#new-account-email').type('casoliss05@r.com');
        cy.get('#new-account-username').type('Charlitox1');
        cy.get('#new-account-name').type('Carlos Solís');
        cy.get('#new-account-password').type('dasjfnaihjdfnsjudnskwqbneqndewsgsdghtykfvnsribfb2fmgjosdngjsdngjsdmngjodfngdjofmngjsrngqfieqwngoqgnwroegnewognowjsgnsjodgnoegnsoegnseognsjogmnosjgnodfsjngosgndosjgnsojgnehsrtsfsrtgsbgsdojgnsdojgnsojgnseognsoegnsegn');

        cy.wait(2000);

        // Click the sign-up button
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/div[2]/button[1]').wait(2000).click();

        cy.wait(10000);

        // Validate that the password validation message is displayed
        cy.get('#modal-alert')
        .should('be.visible')
        .and('contain.text', 'Passwords are limited to 200 characters.');

      });

      it('CPR-05 Caso incorrecto por caracteres muy similares en Password', () => {
        // Fill out the sign-up form without the password
        cy.get('#new-account-email').type('casoliss05@r.com');
        
        cy.get('#new-account-username').type('Charlitox1');

        cy.get('#new-account-name').type('Carlos Solís');
        cy.get('#new-account-password').type('asfasfasfas');

        cy.wait(2000);

        // Click the sign-up button
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/div[2]/button[1]').wait(2000).click();

        cy.wait(10000);

        // Validate that the password validation message is displayed
        cy.get('#modal-alert')
        .should('be.visible')
        .and('contain.text', 'Password has too many repeated characters. Please use a more secure password.');
      });


      it('CPR-06 Caso de prueba correcto sin poner nada en name', () => {
        // Ingresar el nombre de usuario y la contraseña
        cy.get('#new-account-email').type('dcharlisoososon@hotmail.com'); // Cambié el nombre de el email y del username traté probarlo sin
        cy.get('#new-account-username').type('charlisososososn');        //Ejecutar el caso de prueba primero y los valores ya no eran únicos
        cy.get('#new-account-password').type('contras"#$%&/()=?231');
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/div[2]/button[1]').wait(2000).click();
  
        cy.wait(2000);

        cy.url().should('include', '/account-created'); // Adjust this URL path based on actual navigation
  
        cy.contains('Welcome to Discourse!').should('be.visible'); 
  
      });      

      it('CPR-07 Caso incorrecto porque todos los campos son inválidos', () => { //Originalmente era otro caso de prueba pero se cambió pues
        // Fill out the sign-up form without the password                      //El anterior caso de prueba era un duplicado
        cy.get('#new-account-email').type('casolis@s05@r.com');
        cy.get('#new-account-username').type('qw');
        cy.get('#new-account-password').type('la');
    
        // Click the sign-up button
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/div[2]/button[1]').wait(2000).click();
    
        // Validate that the password validation message is displayed
        cy.get('#account-email-validation').should('be.visible').and('contain.text', 'Please enter a valid email address');
        cy.get('#password-validation').should('be.visible').and('contain.text', 'Your password is too short.');
        cy.get('#username-validation').should('be.visible').and('contain.text', 'Your username is too short');
      });

      it('CPR-08 Caso incorrecto porque Password es muy corto y Email contiene dos @', () => { 
        // Fill out the sign-up form without the password                     
        cy.get('#new-account-email').type('pe@pito@noexisto.jeje');
        cy.get('#new-account-username').type(' Fabrigames904');
        cy.get('#new-account-password').type('la');
  
    
        // Validate that the password validation message is displayed
        cy.get('#account-email-validation').should('be.visible').and('contain.text', 'Please enter a valid email address');
        cy.get('#password-validation').should('be.visible').and('contain.text', 'Your password is too short.');
      });

      it('CPR-09 Caso incorrecto porque Password es muy corto y Email el dominio del email es inválido', () => { 
        // Fill out the sign-up form without the password                      
        cy.get('#new-account-email').type('pepito@noexisto.jeje.');
        cy.get('#new-account-username').type(' Fabrigames904');
        cy.get('#new-account-password').type('la');
  
    
        // Validate that the password validation message is displayed
        cy.get('#account-email-validation').should('be.visible').and('contain.text', 'Please enter a valid email address');
        cy.get('#password-validation').should('be.visible').and('contain.text', 'Your password is too short.');
      });

      it('CPR-10 Caso incorrecto porque no hay password y Email el dominio del email es inválido', () => { 
        // Fill out the sign-up form without the password                      
        cy.get('#new-account-email').type('pepito@noexisto.jeje.');
        cy.get('#new-account-username').type('Fabrigames904');
  
        // Click the sign-up button
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/div[2]/button[1]').click();
    
        // Validate that the password validation message is displayed
        cy.get('#account-email-validation').should('be.visible').and('contain.text', 'Please enter a valid email address');
        cy.get('#password-validation').should('be.visible').and('contain.text', 'Please enter a password');
      });


  });