describe('/reset-password', () => {
  const email = 'john.doe@gmail.com';

  it('can send the reset password email', () => {
    cy.signup({ email });
    cy.visit('/reset-password');
    cy.get("[data-cy='email']").type(email);
    cy.get("[data-cy='sendResetLinkBtn']").click();
    cy.contains(
      'Un message avec un lien de réinitialisation vous a été envoyé, merci de vérfier votre boite mail'
    );

    cy.task('getLastEmail', email).then((mail) => {
      expect(mail).not.to.be.null;
      expect(mail.body).to.contain(`/reset-password`);
    });
  });

  it('cannot send the mail if the user is not in db', () => {
    cy.signup({ email });
    cy.visit('/reset-password');
    cy.get("[data-cy='email']").type(email + 'fsgzegezg');
    cy.get("[data-cy='sendResetLinkBtn']").click();
    cy.contains("Cet email n'appartient à aucun utilisateur actif");
  });

  it('should reset the password when provided valid info', () => {
    const resetPasswordToken = 'ezygfizgfuyzgeuygfuzygfuzygfeuyguzyfg';
    const newPassword = 'mynewpassword65@2';

    cy.task('hashPassword', resetPasswordToken).then(
      (hashedResetPasswordToken) => {
        cy.task('deleteUserByEmail', email);
        cy.task('createUser', {
          email,
          password: 'testtesttest',
          resetPasswordToken: hashedResetPasswordToken,
        });
        cy.visit(
          `/reset-password?email=${email}&resetPasswordToken=${resetPasswordToken}`
        );
        cy.get("[data-cy='newPassword']").type(newPassword);
        cy.get("[data-cy='newPasswordConfirmation']").type(newPassword);
        cy.get("[data-cy='resetPasswordBtn']").click();
        cy.url().should('match', /login/);
        cy.task('findUserByEmail', email).then((user) => {
          cy.task('verifyPassword', {
            plain: newPassword,
            hashed: user.hashedPassword,
          }).then((verified) => {
            expect(verified).to.eq(true);
          });
        });
      }
    );
  });

  it('prints an error if the token is ivalid', () => {
    const resetPasswordToken = 'ezygfizgfuyzgeuygfuzygfuzygfeuyguzyfg';
    const newPassword = 'mynewpassword65@2';

    cy.task('hashPassword', resetPasswordToken).then(
      (hashedResetPasswordToken) => {
        cy.task('deleteUserByEmail', email);
        cy.task('createUser', {
          email,
          password: 'testtesttest',
          resetPasswordToken: hashedResetPasswordToken,
        });
        cy.visit(
          `/reset-password?email=${email}&resetPasswordToken=${
            resetPasswordToken + 'test'
          }`
        );
        cy.get("[data-cy='newPassword']").type(newPassword);
        cy.get("[data-cy='newPasswordConfirmation']").type(newPassword);
        cy.get("[data-cy='resetPasswordBtn']").click();
        cy.contains('Code de réinitilisation invalide');
      }
    );
  });

  it('prints an error if passwords dont match', () => {
    const resetPasswordToken = 'ezygfizgfuyzgeuygfuzygfuzygfeuyguzyfg';
    const newPassword = 'mynewpassword65@2';

    cy.task('hashPassword', resetPasswordToken).then(
      (hashedResetPasswordToken) => {
        cy.task('deleteUserByEmail', email);
        cy.task('createUser', {
          email,
          password: 'testtesttest',
          resetPasswordToken: hashedResetPasswordToken,
        });
        cy.visit(
          `/reset-password?email=${email}&resetPasswordToken=${resetPasswordToken}`
        );
        cy.get("[data-cy='newPassword']").type(newPassword);
        cy.get("[data-cy='newPasswordConfirmation']").type(newPassword + 'ef');
        cy.get("[data-cy='resetPasswordBtn']").click();
        cy.contains('Les mots de passe ne coresspondent pas');
      }
    );
  });
});
