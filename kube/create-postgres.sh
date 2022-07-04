#!/bin/sh

helm install -n pos postgresql -f ./kube/postgres-values.yaml bitnami/postgresql