# Static Site DevOps: Multi-Stage CI/CD Pipeline

This project demonstrates a professional **Continuous Integration and Continuous Deployment (CI/CD)** workflow for a static website hosted on Azure. It utilizes a "Staging-First" approach, ensuring that all code is validated and manually approved before reaching the end-users in the production environment.

## 🏗 Infrastructure & Hosting

The "house" for this project is built on **Azure Storage**, utilizing the **Static Website** hosting feature. This provides a high-availability, cost-effective solution for serving HTML, CSS, and JavaScript files.

* 
**Production Environment:** The live, public-facing version of the site.


* 
**Staging Environment:** A mirror of production used for Quality Assurance (QA) and "smoke testing" new features.



## 🛠 CI/CD Pipeline Architecture

The automation is handled through **Azure Pipelines**, structured into distinct stages to ensure code quality.

### Build Stage

* Prepares the source code for deployment.


* Packages the HTML, CSS, and JS files as a pipeline artifact.



### Staging Deployment (The "Pro" Move)

* 
**Trigger:** Automatically fires upon the creation of a **Pull Request (PR)** or a push to the development branch.


* 
**Purpose:** Allows stakeholders to view changes at a dedicated Staging URL before they are merged into the main codebase.



### Production Deployment

* 
**Trigger:** Triggered only when code is successfully merged into the **Main** branch.


* **Safety Gate:** Includes a mandatory **Environment Approval** requirement. The deployment will pause until a designated reviewer manually authorizes the release to the production storage account.



## 🌿 Branching Strategy & Governance

To maintain a stable production environment, this project follows a strict branching and policy framework:

* 
**Main Branch:** Represents the stable, production-ready code.


* 
**Develop Branch:** Used for integrating new features and triggering staging builds.


* **Branch Policies:** The `main` branch is protected. It requires a successful build and a completed Pull Request review before any code can be merged.



## 🚀 Workflow Summary

1. Develop a new feature on a dedicated branch.


2. Open a Pull Request to the integration branch.


3. Verify the changes on the **Staging URL**.


4. Merge to **Main** upon approval.


5. Authorize the final deployment to the **Production URL** via the Azure DevOps environment gate.
