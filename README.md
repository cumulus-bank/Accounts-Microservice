# Cumulus Bank Account Microservice Operator testt
<h1 align="center">
  <br>
  <a href="https://github.com/SaifRehman/mongo-rest-operator"><img src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fjanakirammsv%2Ffiles%2F2018%2F05%2Frh-os.jpg" alt="openshift" width="IBM"></a>
  <br>
      Cumulus Bank Account Microservice Operator for Openshift
  <br>
  <br>
</h1>

<h4 align="center">Powered by Openshift and OperatorSDK</h4>

<p align="center">
  <a>
    <img src="https://img.shields.io/travis/keppel/lotion/master.svg"
         alt="Travis Build">
  </a>
</p>
<br>

## Install Operator on Openshift

1. clone the repo
```
$ git clone https://github.com/cumulus-bank/Accounts-Microservice.git
```
2. install ***serviceaccount***, ***rolebinding***, ***role***, ***crd***, and ***operator***
```
$ oc apply -f deploy/service_account.yaml
$ oc apply -f deploy/role.yaml
$ oc apply -f deploy/role_binding.yaml
$ oc apply -f deploy/operator.yaml
$ oc apply -f deploy/crds/cumulusbank_v1alpha1_cumulusbankaccsvc_crd.yaml
```
## Deploy Cumulus Bank Account Microservice App
``` YAML
apiVersion: cumulusbank.com/v1alpha1
kind: CumulusBankAccSvc
metadata:
  name: accountsvc
spec:
  replicaCount: 2
  namespace: "kubeapp"
  mongodb: 
    host: "mongodb.kubeapp"
    username: "YWRtaW4="
    password: "YWRtaW4="
    secret: "aGVsbG8="
```
3. Apply these YAML configuration

## Cloud Native CI/CD Pipeline on RedHat Openshift

Openshift Pipeline is the native feature provided by Openshift. It leverages Jenkins to create CI/CD pipelines by using BuildConfig operator with Jenkins Strategy.

### CI/CD scenerio 

We are performing CI/CD Pipeline on Accounts Microservice for Cumulus Bank Application. Unit test has been written for Accounts Microservice using testing framework called **Jest** . Example to test if document has been successfully inserted ands validated in MongoDB, healthchecks, Getting correct validated output etc.

#### Some theory behind  unit testing in JavaScript

1. Health checks
``` JavaScript
const functions = {
  fetchHealthz: () =>
    axios
      .get("http://account-svc.cumulusbank:7000/healthz")
      .then(res => res.data)
      .catch(err => "error"),
};
module.exports = functions;
```
> Testing the function if the health output is ok.
``` JavaScript
test("checking health check api", () => {
  expect.assertions(1);
  return functions.fetchHealthz().then(data => {
    expect(data.success).toEqual("ok");
  });
});
```
#### Pipeline scenario 

![1](1.png)

1. The source code of the microservice shall reside in a repository like Github, Gitlab, Gogs, etc. First thing pipeline should do is build the Docker image from the Dockerfile provided in the source code.

2. In the second stage pipeline should deploy the image on Dev namespace

3. Third stage should perform unit test, intgration test, and test coverage. If all the test passes it shall go to the next stage

4. In the fourth stage, if all the tests has been passed, the application will be automatically promoted to Staging. Here UAT test will be performed before it moves to production 

5. If all UAT tests has been passed, the user will manually promote the application from staging to prodiction 