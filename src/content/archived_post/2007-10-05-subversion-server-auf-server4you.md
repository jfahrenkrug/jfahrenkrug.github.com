---
name: subversion-server-auf-server4you

title: Subversion Server auf Server4You VServer einrichten
time: 2007-10-05 15:50:00.001000 Z
categories: []
---

Ich brauche einen <a href="http://subversion.tigris.org/">Subversion</a> Server, den ich von ueberall erreichen kann. Deshalb habe ich mir bei Server4You einen VServer einrichten lassen. Man kann dort <a href="https://www.server4you.de/de/vserver/vservertrial.html">kostenlos einen VServer fuer 4 Tage testen</a>!
Leider bieten sie noch nicht Debian Etch an, aber das ist nicht so schlimm. Also:

<ol><li>Im <a href="https://powerpanel.vserver.de/">Powerpanel</a> rausfinden, was das root Passwort ist</li><li>Mit SSH einloggen</li><li>In die Datei /etc/apt/sources.list diese Zeile einfuegen: deb http://www.backports.org/debian/ sarge-backports main contrib non-free</li><li>apt-get update ausfuehren</li><li>apt-get -t sarge-backports install subversion ausfuehren</li><li>Mit <a href="http://svnbook.red-bean.com/en/1.4/svn.reposadmin.create.html">svnadmin create</a> /pfad/zum/repository (z.B. svnadmin create /opt/svnrep) ein Repository anlegen</li><li>Am besten mit useradd einen neuen User anlegen</li><li>Die Permissions des Repositories so setzen, dass der neue User dort schreiben darf</li><li>Fertig. Jetzt kann man mit svn mkdir <a href="http://svnbook.red-bean.com/en/1.4/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.sshauth">svn+ssh</a>://user@host/pfad/zum/repository/NEUES_DIR zum Beispiel ein neues Verzeichnis im Repository anlegen</li><li>Damit man nicht staendig sein Passwort eingeben muss, sollte man mal einen Blick auf <a href="http://www.unixwiz.net/techtips/ssh-agent-forwarding.html">ssh-agent</a> werfen.</li></ol>Mehr Infos gibt es im <a href="http://svnbook.red-bean.com/">SVN Book</a>.
