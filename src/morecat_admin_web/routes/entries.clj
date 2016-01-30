(ns morecat-admin-web.routes.entries
  (:require [morecat-admin-web.layout :as layout]
            [morecat-admin-web.model.entries :as model]
            [compojure.core :refer [defroutes context GET POST]]
            [ring.util.http-response :refer [ok see-other]]
            [clojure.java.io :as io]))

(defn entries-page []
  (layout/render "entries/list.html" {:entries (:elements (model/find-entries))}))

(defn entry-new-page
  []
  (layout/render "entries/new.html" {:available-formats (model/find-available-formats)
                                      :available-states (model/find-available-states)}))

(defn entry-new-submit
  [entry]
  (do
    (model/create-a-new-entry entry)
    (see-other "/entries")))

(defn entry-edit-page
  [id]
  (layout/render "entries/edit.html" {:entry             (model/find-entry-by-id id)
                                      :available-formats (model/find-available-formats)
                                      :available-states  (model/find-available-states)}))

(defn entry-edit-submit
  [entry]
  (do
    (model/update-entry entry)
    (see-other "/entries")))

(defn entry-deletion-submit
  [id]
  (do
    (model/delete-entry-by-id id)
    (see-other "/entries")))

(defroutes entries-routes
           (context "/entries" []
             (GET "/" [] (entries-page))
             (GET "/new" [] (entry-new-page))
             (POST "/new" [& form] (entry-new-submit form))
             (GET "/:id" [id] (entry-edit-page id))
             (POST "/:id" [& form] (entry-edit-submit form))
             (POST "/deletion/:id" [id] (entry-deletion-submit id))))
