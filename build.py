from os.path import join, dirname
from os import remove, environ
from subprocess import Popen, TimeoutExpired

import lxml.etree as ET
from dotenv import load_dotenv
from clint.textui import colored


#TODO paths and platform (Windows) are hardcoded here

load_dotenv('.env')
ALIAS = environ.get("ALIAS")
assert isinstance(ALIAS, str), "Alias isn't string, check environment variables."
STORE_PASSWORD = environ.get("STORE_PASSWORD")
assert isinstance(STORE_PASSWORD, str), "Keystore password isn't string, \
    check environment variables."
KEYPASS = environ.get("KEYPASS")
assert isinstance(KEYPASS, str), "Keypass password isn't string, \
    check environment variables."
WINDOWS_USER = environ.get("WINDOWS_USER")
assert isinstance(WINDOWS_USER, str), "Windos user isn't string, \
    check environment variables."
folder = dirname(__file__)


def process(proc):
    """
    Communicates with process.
    """
    try:
        outs, errs = proc.communicate(timeout=2400)
    except TimeoutExpired:
        proc.kill()
        outs, errs = proc.communicate()
    return outs, errs


def write_environment(env):
    """
    Rewrites environemtn.
    """

    assert isinstance(env, str)
    source = open(join(folder, 'envs', env+'.ts'), 'r').read()

    with open(join(folder, 'src', 'environments', 'environment.ts'), 'w') as env_file:
        env_file.write(source)
        env_file.close()
    print(colored.green("Env file done."))


def write_config_xml(iden, name, description, version):
    """
    Rewrites config.xml
    """
    config_file = 'config.xml'
    tree = ET.parse(config_file)
    root = tree.getroot()
    root.attrib['id'] = iden
    root.attrib['version'] = version

    for child in root:
        if child.tag.replace("{http://www.w3.org/ns/widgets}", "") == "name":
            child.text = name
        if child.tag.replace("{http://www.w3.org/ns/widgets}", "") == "description":
            child.text = description
    tree.write(config_file)
    print(colored.green("Config.xml file done."))


def remove_old_apk(env):
    """
    Deletes old apk.
    """
    try:
        remove(join(folder, 'apks', env+'.apk'))
        print("Old apk removed.")
    except IOError:
        pass


def build_apk():
    """
    Builds apk.
    """
    proc = Popen("cd D:\\ArchivedGitHubProjects\\_archived\\qprob_ion && ionic cordova build --prod \
        --release android", shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    print(colored.green("Apk built."))


#TODO command line arguments for this script
def generate_apk_key():
    """
    Generates keystore.
    """

    proc = Popen('cd "C:\\Program Files\\Android\\Android Studio\\jre\\jre\\bin" && \
        .\\keytool.exe -genkey -v -keystore \
        D:\\ArchivedGitHubProjects\\_archived\\qprob_ion\\qprob-key.keystore \
        -alias {} -keyalg RSA -keysize 2048 -validity 10000'.format(ALIAS), \
        shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Key generated."))


def sign_apk():
    """
    Signs apk.
    """
    proc = Popen('"C:\\Program Files\\Android\\Android Studio\\jre\\bin\\jarsigner.exe" \
        -verbose -sigalg SHA1withRSA -digestalg SHA1 \
        -keystore D:\\ArchivedGitHubProjects\\_archived\\qprob_ion\\qprob-key.keystore \
        D:\\ArchivedGitHubProjects\\_archived\\qprob_ion\\platforms\\android\\build\\outputs\\apk\\android-release-unsigned.apk {0} \
        -keypass {1} -storepass {2}'.format(ALIAS, KEYPASS, STORE_PASSWORD), shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Apk signed."))


def zipalign_apk(env):
    """
    Zipalgns apk.
    """
    proc = Popen("C:\\Users\\{0}\\AppData\\Local\\Android\\sdk\\build-tools\\26.0.0\\zipalign.exe \
        -v 4 D:\\ArchivedGitHubProjects\\_archived\\qprob_ion\\platforms\\android\\build\\outputs\\apk\\android-release-unsigned.apk \
        D:\\ArchivedGitHubProjects\\_archived\\qprob_ion\\apks\{1}.apk".format(WINDOWS_USER, env), \
        shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Apk zipaligned and ready to be uploaded to Google Play."))


def main():
    """
    Multiple apk builder (for qprob_ion).
    """
    version = "1.0.2"
    projects = [
        {"env": "qprob", "iden": "talaikis.qprob.qprob", "name": "Trading Daily", \
            "description": "Talking summaries of trading news daily."},
        {"env": "bsnssnws", "iden": "talaikis.qprob.bsnssnws", "name": "Business Daily", \
            "description": "Talking summaries of business news daily."},
        {"env": "stckmrkt", "iden": "talaikis.qprob.stckmrkt", "name": "Stock Market Daily", \
            "description": "Talking summaries of stock market news daily."},
        {"env": "entreprnrnws", "iden": "talaikis.qprob.entreprnrnws", "name": "Entrepreneurship \
            Daily", "description": "Daily talkinbg news summaries on entrepreneurship."},
        {"env": "parameterless", "iden": "talaikis.qprob.parameterless", "name": "Technology \
            Daily", "description": "Talking technology news summaries daily."},
        {"env": "webdnl", "iden": "talaikis.qprob.webdnl", "name": "Insurance Daily", \
            "description": "Daily talking insurance news summaries."},
        {"env": "realestenews", "iden": "talaikis.qprob.realest", "name": "Real Estate Invest", \
            "description": "Talking real estate investing news daily."},
    ]

    for proj in projects:
        print(proj['env'])
        write_environment(env=proj['env'])
        write_config_xml(iden=proj['iden'], name=proj['name'], description=proj['description'], \
            version=version)
        remove_old_apk(env=proj['env'])
        build_apk()
        sign_apk()
        zipalign_apk(env=proj['env'])


main()
