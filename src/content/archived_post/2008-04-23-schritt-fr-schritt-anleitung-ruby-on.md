---
name: schritt-fr-schritt-anleitung-ruby-on

title: "Schritt f\xC3\xBCr Schritt Anleitung: Ruby On Rails Deployment mit Capistrano, Mongrel, Apache, Subversion und Dir"
time: 2008-04-23 08:22:00.002000 Z
categories:
  - Programming
  - Tutorials
  - rails
  - Deutsch
---

Note to English speaking readers: I've written this tutorial in German because there are a lot of <a href="http://blog.codahale.com/2006/06/19/time-for-a-grown-up-server-rails-mongrel-apache-capistrano-and-you/">good Rails deployment tutorials</a> out there in English, but not so many in German. If enough people email me or comment and say they want this in English I might translate it ;-).

So, jetzt auf Deutsch: Du willst deine grossartige nagelneu programmierte Ruby On Rails Anwendung fuer die Welt (oder immerhin fuer deinem Kunden) nutzbar machen. Dann will ich dich nicht aufhalten und dir in 27 einfachen Schritten zeigen, wie es geht. Dann wollen wir mal...

<ol>
<li>Log dich mit ssh in den Server ein, auf dem die Rails Applikation laufen soll.</li>
<li>Wenn du dich nicht als root angemeldet hast, werde jetzt root (su -)</li>
<li>Stell sicher, dass ein Editor wie vi richtig funktioniert. Wenn man von Mac OS X auf einen Linux Rechner geht kann es <a href="http://hans.fugal.net/blog/articles/2008/02/12/os-x-terminal-emulation-woes">manchmal Probleme geben</a>. Auf Debian Systemen schafft da oft
<pre class="prettyprint">
apt-get install ncurses-term
</pre>
Abhilfe.</li>
<li>Aktualisiere die verfuegbaren Pakete:
<pre class="prettyprint">
apt-get update</pre></li>
<li>Installiere folgende Pakete:
<pre class="prettyprint">apt-get install mysql-server
apt-get install ruby
apt-get install ruby1.8-dev
apt-get install rubygems
apt-get install subversion
apt-get install make
apt-get install build-essential
apt-get install curl
apt-get install apache2
</pre></li><li>Installiere folgende Ruby Gems:
<pre class="prettyprint">gem install --include-dependencies rails
gem install --include-dependencies capistrano
gem install --include-dependencies mongrel (jeweils die neuste ruby version nehmen)
gem install --include-dependencies mongrel_cluster
</pre>
</li><li>Gehe nochmal sicher, dass alles aktuell ist:
<pre class="prettyprint">
gem update --system
</pre>
Wenn du irgendwo den Fehler

<pre class="prettyprint">/usr/bin/gem:23: uninitialized constant Gem::GemRunner (NameError)
</pre>

bekommst ist das damit zu loesen, folgende Zeile in /usr/bin/gem einzufuegen:

<pre class="prettyprint">require 'rubygems/gem_runner'
</pre>

Und um den Fehler

<pre class="prettyprint">undefined method `require_gem' for main:Object
</pre>

spaeter beim Deployment zu vermeiden solltest du nochmal

<pre class="prettyprint">gem install --remote rake
</pre>

ausfuehren. Wenn das nicht hilft, in /var/lib/gems/1.8/bin/rake

<pre class="prettyprint">require_gem 'rake', version
</pre>

in

<pre class="prettyprint">
gem 'rake', version
</pre>

abaendern.

</li><li>Jetzt musst du die Datenbank einrichten. Wir nehmen hier MySQL und der Einfachheit halber nenne ich in dieser Anleitung die Datenbank, den Datenbank Benutzer und die Rails-Anwendung "springenwerk".

Root Passwort setzen:

<pre class="prettyprint">
mysqladmin -u root password ein_passwort_meiner_wahl
</pre>

(danach am besten die bash_history loeschen) Dann die Datenbank anlegen und die Berechtigung setzen:

<pre class="prettyprint">
mysql -u root -p
CREATE DATABASE springenwerk;
GRANT ALL PRIVILEGES ON springenwerk.* TO 'springenwerk'@'localhost' IDENTIFIED BY 'ein_password_meiner_wahl' WITH GRANT OPTION;
</pre>

Die Angaben fuer die Produktions-Datenbank (Name, Username und Passwort) muessen den Angaben in der app/config/database.yml Datei der Rails Anwendung entsprechen.

Jetzt kannst du den Mysql Client mit 'exit' verlassen.

</li><li>Die ausfuehrbaren Ruby Gems willst du jetzt natuerlich gerne in deinem Pfad haben. Also
in der /etc/profile
    /var/lib/gems/1.8/bin
an die PATH Variable haengen. Das kann man so machen:
<pre class="prettyprint">
PATH=$PATH:/var/lib/gems/1.8/bin
</pre>
Du musst nur aufpassen, dass die das vor die Zeile "export PATH" schreibst.

</li><li>Dann die Aenderungen in der aktuellen Session nutzbar machen:
<pre class="prettyprint">
source /etc/profile
</pre>
Wenn du dann

<pre class="prettyprint">rails -v
</pre>

ausfuehren kannst hat alles geklappt.

</li><li>Jetzt solltest du einen eigenen User fuer deine Rails Anwendung anlegen:
<pre class="prettyprint">
useradd -m springenwerk
</pre>
und das Passwort setzten:
<pre class="prettyprint">
passwd springenwerk
</pre>
Und ihn zu den sudoers packen:
<pre class="prettyprint">
visudo
</pre>
und dann unten folgende Zeile hinzufuegen (natuerlich "springenwerk" wieder mit deinem Produktions-Usernamen ersetzen):
<pre class="prettyprint">
springenwerk ALL=(ALL) ALL
</pre>
</li><li>Da sich Capistrano per SSH einloggt aber auch ein gewisse Benutzerumgebung braucht (z.B. den PATH) musst du in die /etc/ssh/sshd_config folgende Zeilen einfuegen:
<pre class="prettyprint"># for capistrano
PermitUserEnvironment yes
</pre></li><li>Dann SSHD neu starten:
<pre class="prettyprint">
/etc/init.d/ssh restart
</pre></li><li>In /home/springenwerk/.ssh/environment (ggf. ".ssh" Verzeichnis und Datei anlegen) folgende Zeilen einfuegen:
<pre class="prettyprint">PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/var/lib/gems/1.8/bin
RUBYOPT=rubygems
</pre></li><li>Jetzt musst du auf dem CLIENT Capistrano und Mongrel Cluster installieren (ich gehe davon aus, dass Ruby und Rails schon installiert sind)
<pre class="prettyprint">sudo gem install capistrano
sudo gem install capistrano-ext
sudo gem install mongrel_cluster
</pre>
Ab Mac OS X Leopard ist capistrano schon dabei, aber stelle mit
<pre class="prettyprint">
sudo gem update capistrano
</pre>sicher, dass du mindestens Version 2.1 hast.

</li><li>Wechsle in dein Rails Projekt Verzeichnis:
<pre class="prettyprint">
cd /Users/johannes/Code/springenwerk/trunk/springenwerk
</pre></li><li>Jetzt erstellst du eine Konfigurationsdatei fuer den Mongrel Cluster:
<pre class="prettyprint">
mongrel_rails cluster::configure -e production -p 8000 -a 127.0.0.1 -N 2 -c /home/springenwerk/springenwerk/current
</pre>
-p 8000 sagt, dass die Server ab Port 8000 lauschen, -N 2 sagt, dass es zwei Instanzen geben wird (also eine auf Port 8000, eine auf 8001) und mit -c gibt man das Verzeichnis an, wo auf dem PRODUKTIONSSERVER die Applikation liegen wird (in diesem Fall ein Unterverzeichnis, das so heisst wie die Applikation im Home-Verzeichnis des Users, den wir angelegt haben (welcher auch so heisst wie die Applikation) und mit dem Zusatz "current". Das musst da stehen, denn das
ist ein Symlink, den Capistrano anlegt und der immer auf die aktuelle Version zeigt.

</li><li>Jetzt musst du dein Rails Projekt capistranofizieren ;-). Wechsle in dein Rails Projekt Verzeichnis:
<pre class="prettyprint">
cd /Users/johannes/Code/springenwerk/trunk/springenwerk
</pre>
und fuehre capify aus:
<pre class="prettyprint">
capify .
</pre>
</li><li>Oeffne jetzt config/deploy.rb in deinem Editor und passe die Datei so an, dass sie so aussieht (mit deinen User- und Projektnamen und Passwoertern natuerlich):
<pre class="prettyprint">
require 'mongrel_cluster/recipes'

default_run_options[:pty] = true # to make sure password prompts are forwarded to you, the user

set :application, "springenwerk"
set :repository_url, "svn://DEIN_SVN_USER@DEIN_SVN_SERVER/springenwerk/trunk/springenwerk"

if ENV['svn_prompt'] and ENV['svn_prompt'] == '1'
set :svn_user, Proc.new { Capistrano::CLI.password_prompt('SVN User: ') }
set :svn_password, Proc.new { Capistrano::CLI.password_prompt('SVN Password: ') }
set :repository, Proc.new { "--username #{svn_user} --password #{svn_password} #{repository_url}" }
else
set :repository, repository_url
end

set :deploy_to, "/home/#{application}/#{application}" # defaults to "/u/apps/#{application}"
set :deploy_via, "export"
set :user, application # in our case, the user and the application have the same name.

set :mongrel_conf, "#{current_path}/config/mongrel_cluster.yml"

role :app, "DEIN_PRODUCTION_SERVER"
role :web, "DEIN_PRODUCTION_SERVER"
role :db, "DEIN_PRODUCTION_SERVER", :primary =&gt; true

# Task to copy production db config after deployment

task :after_update_code, :roles =&gt; :app do
 db_config = "#{shared_path}/config/database.yml.production"
run "cp #{db_config} #{release_path}/config/database.yml"
end

</pre>
Die Datei werde ich hier nicht gross erklaeren, dazu gibt es <a href="http://www.capify.org/getting-started">andere Stellen</a>.

Diese deploy.rb Datei hat aber eine kleine Besonderheit (Danke an <a href="http://jonathan.tron.name/articles/2006/07/15/capistrano-password-prompt-tips">Jonathan</a>).
Da Subversion natuerlich einen Benutzernamen und ein Passwort erwartet wird normalerweise empfohlen, einmal irgendwo auf dem Produktionsserver das Rails Projekt auszuchecken, damit die Credentials gecachet werden und Capistrano nicht mehr nach SVN Benutzernamen und Passwort fragt. Das koennen wir uns jetzt sparen.
Wir koennen naemlich jetzt angeben, dass Capistrano uns beim ersten Mal einfach nach den Zugangsdaten fuer SVN fragt. Dazu gleich mehr.

</li><li> Jetzt kann Capistrano die Verzeichnisse auf dem Produktionsserver anlegen. Auf deinem CLIENT fuehre folgendes aus:
<pre class="prettyprint">
cap deploy:setup
</pre></li><li>Stelle die neuen Konfigurationsdateien unter Versionskontrolle und checke sie ein:
<pre class="prettyprint">
svn add Capfile config/mongrel_cluster.yml config/deploy.rb
svn ci -m "capistrano config"
</pre></li><li>Du willst aus Sicherheitsgruenden deine Produktionsdatenbank Passwoerter nicht ins SVN einchecken. Deshalb solltest du eine Datei namens database.yml.production anlegen, die die
Zugangsdaten fuer deine Produktionsdatenbank enthaelt. Unser "after_update_code" Task in deploy.rb erwartet diese Datei und kopiert sie dann ueber die ausgecheckte database.yml. Zum Beispiel koennte sie so aussehen:
<pre class="prettyprint">
development:
  adapter: mysql
  database: springenwerk_development
  username: root
  password: root
  host: localhost
  socket: /Applications/MAMP/tmp/mysql/mysql.sock

# Warning: The database defined as 'test' will be erased and

# re-generated from your development database when you run 'rake'.

# Do not set this db to the same as development or production.

test:
 adapter: mysql
database: springenwerk_test
username: root
password: root
host: localhost

production:
 adapter: mysql
database: springenwerk
username: springenwerk
password: DEIN_PASSWORT
host: localhost
socket: /var/run/mysqld/mysqld.sock

</pre>
Diese packst du auf dem Produktionsserver in folgendes Verzeichnis:
<pre class="prettyprint">
/home/springenwerk/springenwerk/shared/config
</pre>Das config Verzeichnis musst du vorher anlegen.

</li><li>Jetzt kannst du mit Capistrano von deinem CLIENT ein Erst-Deployment (cold deployment) durchfuehren (in deinem Rails Projektverzeichnis)
<pre class="prettyprint">
svn_prompt=1 cap deploy:cold
</pre>"svn_prompt" ist einen Umgebungsvariable, die unserem deploy.rb Skript sagt, dass es nach den SVN Zugangsdaten fragen soll. Denke daran, dass wenn Capistrano dich nach dem Passwort fuer deinen Produktionsserver fragt das Passwort fuer den nicht-root User (in diesem Beispiel "springenwerk") fragt!

Achte darauf, dass es keine Fehler gibt, am Ende sollte

<pre class="prettyprint">
command finished
</pre>stehen.

</li><li>Pruefe auf dem SERVER, ob die Mongrel Dienste laufen:
<pre class="prettyprint">
curl -I http://127.0.0.1:8000
</pre>Wenn Mongrel laeuft, sollte die Ausgabe ungefaehr so aussehen:
<pre class="prettyprint">
HTTP/1.1 302 Moved Temporarily
Connection: close
Date: Wed, 06 Feb 2008 11:42:33 GMT
Set-Cookie: _springenwerk_session_id=f4a9b408f36d0df7561fd778e46d2c62; path=/
Status: 302 Found
Location: http://127.0.0.1:8000/session/new
Cache-Control: no-cache
Server: Mongrel 1.1.3
Content-Type: text/html; charset=utf-8
Content-Length: 101
</pre>
Sehr gut. Jetzt musst du nur noch Apache als Loadbalancer einrichten. Ein Kinderspiel ;-)

</li><li>Ok, Apache. Bevor du die folgenden Sachen machst, ein kleiner Disclaimer: ich bin kein Apache-Config-Profi. Es kann gut sein, dass es elegantere Wege gibt, das gute Stueck zu konfigurieren. Alle Hinweise die zur Ergreifung des Taeters fuehren werden sehr geschaetzt.

Ans Ende von /etc/apache2/apache2.conf folgendes anfuegen (im vi mit G ans Ende der Datei springen):

<pre class="prettyprint">
&lt;Proxy balancer://mongrel_cluster&gt;
  BalancerMember http://127.0.0.1:8000
  BalancerMember http://127.0.0.1:8001
&lt;/Proxy&gt;
</pre>Der Inhalt der /etc/apache2/sites-available/000-default Datei muss so aussehen (ich gehe in dem Beispiel davon aus, dass der Apache nur fuer deine Rails Anwendung benutzt wird):
<pre class="prettyprint">
&lt;VirtualHost *:80&gt;
    ServerAdmin webmaster@localhost

    DocumentRoot /home/springenwerk/springenwerk/current/public
    &lt;Directory /home/springenwerk/springenwerk/current/public&gt;
        Options FollowSymLinks
        AllowOverride None
        Order allow,deny
        allow from all
    &lt;/Directory&gt;

    RewriteEngine On

    RewriteLog /var/log/apache2/rewrite.log
    RewriteLogLevel 9

    RewriteCond %{DOCUMENT_ROOT}/system/maintenance.html -f
    RewriteCond %{SCRIPT_FILENAME} !maintenance.html
    RewriteRule ^.*$ /system/maintenance.html [L]

    RewriteRule ^/$ /index.html [QSA]

    RewriteRule ^([^.]+)$ $1.html [QSA]

    RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f

    RewriteRule ^/(.*)$ balancer://mongrel_cluster%{REQUEST_URI} [P,QSA,L]

    ErrorLog /var/log/apache2/error.log

    # Possible values include: debug, info, notice, warn, error, crit,
    # alert, emerg.
    LogLevel warn

    CustomLog /var/log/apache2/access.log combined
    ServerSignature Off

&lt;/VirtualHost&gt;
</pre></li><li>Dann musst du in /etc/apache2/mods-enabled folgende Symlinks anlegen:
<pre class="prettyprint">
ln -s ../mods-available/proxy_balancer.load
ln -s ../mods-available/proxy.conf
ln -s ../mods-available/proxy_http.load
ln -s ../mods-available/proxy.load
ln -s ../mods-available/rewrite.load
</pre>

Der Inhalt der proxy.conf muss so aussehen:

<pre class="prettyprint">
&lt;IfModule mod_proxy.c&gt;
        #turning ProxyRequests on and allowing proxying from all may allow
        #spammers to use your proxy to send email.

        ProxyRequests Off

        &lt;Proxy *&gt;
                AddDefaultCharset off
                Order allow,deny
                Allow from all
        &lt;/Proxy&gt;

        # Enable/disable the handling of HTTP/1.1 "Via:" headers.
        # ("Full" adds the server version; "Block" removes all outgoing Via: headers)
        # Set to one of: Off | On | Full | Block

        ProxyVia On
&lt;/IfModule&gt;
</pre>
</li><li>Dann nur noch Apache neu starten:
<pre class="prettyprint">
/etc/init.d/apache2 restart
</pre>
</li><li>Feierabend. Das wars.</li>
</ol>
Wenn du jetzt eine neue Version deiner Anwendung live stellen willst, musst du nur in deinem Rails Projektverzeichnis
<pre class="prettyprint">
cap deploy
</pre>
bzw
<pre class="prettyprint">
cap deploy:migrations
</pre>
ausfuehren wenn es neue Datenbankmigrationen gibt. Capistrano macht dann den Rest!

Bitte benutze die Kommentarfunktion wenn du beim Folgen dieser Schritte ein paar Tipps oder Probleme gefunden hast.
Grosser Dank gilt noch dem grossartigen <a href="http://blog.codahale.com/2006/06/19/time-for-a-grown-up-server-rails-mongrel-apache-capistrano-and-you/">Tutorial von Coda</a>. Da gibt es noch sehr viel Hintergrundinfos. Ich wollte das hier nicht alles wiederholen, sondern es eher kurz und knapp halten. Ich hoffe, dass es ganz hilfreich ist.

Wenn das der Fall ist w&uuml;rde ich mich sehr &uuml;ber eine Empfehlung freuen:<br/><a href="http://workingwithrails.com/recommendation/new/person/11816-johannes-fahrenkrug"><img alt="Recommend Me" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a><br/>Danke!
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hallo Markus,<BR/><BR/>hmmm... das sieht so aus als ob das SVN auf deinem Server in dem Repository unter file:///subversion/projekte/todo/trunk keine Revision mit der Nr 13 finden kann. Kann es sein, dass du das SVN Repository bei dir auf deiner Lokalen Entwicklungsmaschine laufen hast, sodass der Server, auf dem die Anwendung deployt werden soll, da nicht rankommt?<BR/>Du muss dein SVN Repository so aufsetzten, dass es von deiner Entwicklungsmaschine und von deinem Server erreicht werden kann...<BR/>ODER...<BR/>du nimmst die copy deploy stategy:<BR/><BR/>set :deploy_via, :copy<BR/>set :copy_strategy, :export<BR/><BR/>dann wir der kram lokal auf deiner entwicklungsmaschine exportiert, getart und gegzipt und dann per sftp auf deinen server geschoben. Der Server braucht dann keinen SVN Zugang mehr. Siehe auch http://www.capify.org/upgrade/whats-new<BR/><BR/>Viel Erfolg!<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">November 03, 2008 06:51 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/16326558021489772407">M</a> said...</h4>
<p style="margin-left: 30px">hallo johannes ...<BR/>vielen dank für die tolle anleitung!<BR/>leider habe ich ein problem:<BR/>- bis zu &quot;cap deploy:check&quot; sieht alles gut aus<BR/>- auch &quot;cap deploy:setup&quot; läuft ohne fehler ab<BR/>- bei &quot;cap deploy:cold&quot; erhalte ich allerdings folgende fehlermeldung:<BR/>-----<BR/>root@ubu804s-1:/var/www/rails/todo# cap deploy:cold<BR/>  * executing `deploy:cold&#39;<BR/>  * executing `deploy:update&#39;<BR/> ** transaction: start<BR/>  * executing `deploy:update_code&#39;<BR/>  * executing &quot;svn export -q  -r13 file:///subversion/projekte/todo/trunk /var/www/rails/todo/releases/20081102094125 &amp;&amp; (echo 13 &gt; /var/www/rails/todo/releases/20081102094125/REVISION)&quot;<BR/>    servers: [&quot;192.168.2.44&quot;]<BR/>Password:<BR/>    [192.168.2.44] executing command<BR/> ** [192.168.2.44 :: err] svn: No such revision 13<BR/>    command finished<BR/>*** [deploy:update_code] rolling back<BR/>  * executing &quot;rm -rf /var/www/rails/todo/releases/20081102094125; true&quot;<BR/>    servers: [&quot;192.168.2.44&quot;]<BR/>    [192.168.2.44] executing command<BR/>    command finished<BR/>failed: &quot;sh -c \&quot;svn export -q  -r13 file:///subversion/projekte/todo/trunk /var/www/rails/todo/releases/20081102094125 &amp;&amp; (echo 13 &gt; /var/www/rails/todo/releases/20081102094125/REVISION)\&quot;&quot; on 192.168.2.44<BR/>root@ubu804s-1:/var/www/rails/todo#<BR/>-----<BR/>was mache ich falsch? wo finde ich hilfe?<BR/><BR/>vielen dank vorab für deine unterstützung!<BR/><BR/>gruss markus</p>
<em class="swlightgray" style="margin-left: 30px">November 02, 2008 08:48 AM</em></div>
