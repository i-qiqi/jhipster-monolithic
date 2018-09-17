#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    gitlabCommitStatus('build') {
        docker.image('jhipster/jhipster:v5.3.0').inside('-u root -e GRADLE_USER_HOME=.gradle') {
            stage('check java') {
                sh "java -version"
            }

            stage('clean') {
                sh "chmod +x gradlew"
                sh "./gradlew clean --no-daemon"
            }

            stage('install tools') {
                sh "./gradlew yarn_install -PnodeInstall --no-daemon"
            }

            stage('backend tests') {
                try {
                    sh "./gradlew test -PnodeInstall --no-daemon"
                } catch(err) {
                    throw err
                } finally {
                    junit '**/build/**/TEST-*.xml'
                }
            }

            stage('frontend tests') {
                try {
                    sh "./gradlew yarn_test -PnodeInstall --no-daemon"
                } catch(err) {
                    throw err
                } finally {
                    junit '**/build/test-results/jest/TESTS-*.xml'
                }
            }

            stage('packaging') {
                sh "./gradlew bootWar -x test -Pprod -PnodeInstall --no-daemon"
                archiveArtifacts artifacts: '**/build/libs/*.war', fingerprint: true
            }

        }

        def dockerImage
        stage('build docker') {
            sh "cp -R src/main/docker build/"
            sh "cp build/libs/*.war build/docker/"
            dockerImage = docker.build('docker-login/store', 'build/docker')
        }

        stage('publish docker') {
            docker.withRegistry('https://registry.hub.docker.com', 'docker-login') {
                dockerImage.push 'latest'
            }
        }
    }
}