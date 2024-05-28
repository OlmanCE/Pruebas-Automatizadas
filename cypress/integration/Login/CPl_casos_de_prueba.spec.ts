describe('Casos de prueba de Registro', () => {
    beforeEach(() => {
      // Visit the Discourse page before each test
      cy.visit('http://192.168.1.101/latest');
      // Click on the "Sign Up" button
      cy.contains('Log In').click();
    });

    it('CPl-01 Caso de prueba correcto usando nombre de usuario', () => {
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('user');       //Recuerda que debes utilizar tus propios username y cotraseñas bindadas 
        cy.get('#login-account-password').type('koA!8Lh!Qi6B'); //de manera automática por la máquina virtual de bitnami, si no no funcionar+a
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  
        cy.contains('Welcome to your new site!').should('be.visible'); 
  
      });
    
      it('CPl-02 Caso de prueba incorrecto por no poner ningún valor en la contraseña', () => {
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('user');        
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  
        cy.contains('Please enter your email or username, and password.').should('be.visible'); 
      });    
      
      it('CPl-03 Caso de prueba incorrecto por contraseña muy corta', () => {
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('user');     
        cy.get('#login-account-password').type('la');   
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  
        cy.contains('Incorrect username, email or password').should('be.visible'); 
  
      });      

      it('CPl-04 Caso de prueba incorrecto por contraseña muy larga', () => {
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('user');     
        cy.get('#login-account-password').type('djsafsgafnajgnerjhgnjksrtnhjidfnghjnrsghijndfjihnerijghneorjnghijenrgkonrjbenbjkorbneornbjeornbejobnejorbnkobndojrbndojbndkobnrodjbnojkdfnbodrnbkojsrnbojdnrjobndorjbnojsdrbnosdrnbjodbndjkornbdijorbjobdn');   
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  
        cy.contains('Incorrect username, email or password').should('be.visible'); 
  
      });    

      it('CPl-05 Caso de prueba incorrecto con email con dominio inexistente y contraseña con caracteres repetitivos', () => {
        // Es importante destacar que para que esto funcione, el email tuvo que haber sido previamente registrado!!!!
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('pepito@noexisto.jeje');     
        cy.get('#login-account-password').type('asfasfasfas');   
    
        cy.wait(2000)

        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();

        cy.wait(2000)
  
        cy.contains('Incorrect username, email or password').should('be.visible'); 
      });   

      it('CPl-06 Caso de prueba correcto con email con dominio inesitente  pero fue previamente registrado y contraseña correcta', () => {
        // Es importante destacar que para que esto funcione, el email tuvo que haber sido previamente registrado!!!!
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('pepito@noexisto.jeje');     
        cy.get('#login-account-password').type('lacasaamasada');   
    
        cy.wait(2000)

        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();

        cy.wait(10000)
  
        cy.contains('Resend Activation Email').should('be.visible'); 
      });    

      it('CPl-07 Caso de prueba incorrecto un email con dominio inexistente y ningun valor de contraseña', () => {
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('pepito@noexisto.jeje');        

        cy.wait(2000)
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();

        cy.wait(2000)
  
        cy.contains('Please enter your email or username, and password.').should('be.visible'); 
  
      });

      
      it('CPl-08 Caso de prueba incorrecto con email con dos @ y contraseña muy corta', () => {
        // Es importante destacar que para que esto funcione, el email tuvo que haber sido previamente registrado!!!!
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('pe@pito@noexisto.jeje');     
        cy.get('#login-account-password').type('la');   

        cy.intercept('POST', 'http://192.168.1.101/session').as('usernameAvailability')
      
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();

        // Wait for the username availability check to complete
        cy.wait('@usernameAvailability').then(() => {
          // Validate that the password validation message is displayed
          cy.get('#modal-alert')
            .should('be.visible')
            .and('contain.text', 'Incorrect username, email or password');

        });
  
      });      
    
      it('CPl-09 Caso de prueba incorrecto con email con dos @ y contraseña muy larga', () => {
        // Es importante destacar que para que esto funcione, el email tuvo que haber sido previamente registrado!!!!
        // Ingresar el nombre de usuario y la contraseña

        cy.get('#login-account-name').type('pe@pito@noexisto.jeje');     
        cy.get('#login-account-password').type('djsafsgafnajgnerjhgnjksrtnhjidfnghjnrsghijndfjihnerijghneorjnghijenrgkonrjbenbjkorbneornbjeornbejobnejorbnkobndojrbndojbndkobnrodjbnojkdfnbodrnbkojsrnbojdnrjobndorjbnojsdrbnosdrnbjodbndjkornbdijorbjobdn');   
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  
        cy.contains('Incorrect username, email or password').should('be.visible'); 
      }); 

      it('CPl-10 Caso de prueba incorrecto con email y contraseña vacíos', () => { //Se cambió para probar el caso en el que ambos espacios estén vacíos 
    
        // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
        cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  
        cy.contains('Please enter your email or username, and password.').should('be.visible'); 
      }); 

  });