(ns morecat-admin-web.routes.entries
  (:require [morecat-admin-web.layout :as layout]
            [compojure.core :refer [defroutes GET]]
            [ring.util.http-response :refer [ok]]
            [clojure.java.io :as io]))

(defn entries-page []
  (layout/render "entries.html"))

(defroutes entries-routes
  (GET "/entries" [] (entries-page)))

