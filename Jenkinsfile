pipeline {
  agent any

  environment {
    NODE_PATH = "$HOME/.nvm/versions/node/v22.17.0/bin"
    PATH = "${env.NODE_PATH}:${env.PATH}"
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build Angular App') {
      steps {
        sh 'npm run build --prod'
      }
    }

    stage('Deploy to Server') {
      steps {
        sh '''
          sudo mkdir -p /var/www/drac
          sudo rm -rf /var/www/drac/*
          sudo cp -r dist/drac/browser/* /var/www/drac/
          sudo chown -R www-data:www-data /var/www/drac
        '''
      }
    }

    stage('Restart Apache...') {
      steps {
        sh '''
          sudo systemctl restart apache2
        '''
      }
    }
  }
}
