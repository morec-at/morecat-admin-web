(ns morecat-admin-web.handler
  (:require [compojure.core :refer [defroutes routes wrap-routes]]
            [morecat-admin-web.layout :refer [error-page]]
            [morecat-admin-web.routes.home :refer [home-routes]]
            [morecat-admin-web.routes.entries :refer [entries-routes]]
            [morecat-admin-web.middleware :as middleware]
            [clojure.tools.logging :as log]
            [compojure.route :as route]
            [environ.core :refer [env]]
            [morecat-admin-web.config :refer [defaults]]
            [mount.core :as mount]))

(defn init
  "init will be called once when
   app is deployed as a servlet on
   an app server such as Tomcat
   put any initialization code here"
  []
  (when-let [config (:log-config env)]
    (org.apache.log4j.PropertyConfigurator/configure config))
  (doseq [component (:started (mount/start))]
    (log/info component "started"))
  ((:init defaults)))

(defn destroy
  "destroy will be called when your application
   shuts down, put any clean up code here"
  []
  (log/info "morecat-admin-web is shutting down...")
  (doseq [component (:stopped (mount/stop))]
    (log/info component "stopped"))
  (log/info "shutdown complete!"))

(def app-routes
  (routes
    (wrap-routes #'home-routes middleware/wrap-csrf)
    (wrap-routes #'entries-routes middleware/wrap-csrf)
    (route/not-found
      (:body
        (error-page {:status 404
                     :title "page not found"})))))

(def app (middleware/wrap-base #'app-routes))
