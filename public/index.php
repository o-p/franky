<?php

require __DIR__ . '/../php_lib/comn.php';

header('Access-Control-Allow-Origin: * ');

define("JSON_KEYWORD", "%JSON_CONFIG%");

$setting_file = 'preview/setting.json';
$config_file = 'config.json';
$referer = isset($_SERVER["HTTP_REFERER"])?$_SERVER["HTTP_REFERER"]:'';
$uri = $_SERVER['REQUEST_URI'];
$action = isset($_POST['action'])? $_POST['action']:(isset($_GET['action'])?$_GET['action']:'');
$type = isset($_POST['type'])?$_POST['type']:'';
$key = isset($_POST['key'])?$_POST['key']:'';
$value = isset($_POST['value'])?$_POST['value']:'';
$origin = isset($_GET['origin'])?$_GET['origin']:'';
$data = isset($_POST['json'])?$_POST['json']:'';
$host = $_SERVER['SERVER_NAME'];

// get id with POST method, use header referer
if ($referer) {
    $pIdx = strpos($referer, $uri);
    if ($pIdx) {
        $id = substr($referer, $pIdx + strlen($uri), -1);
    }
}
//get id with GET method
if ($origin) {
    // it is GET method, need to ignore parameters
    $uri = strtok($uri, '?');
    $pIdx = strpos($origin, $uri);
    if ($pIdx) {
        $id = substr($origin, $pIdx + strlen($uri), -1);
    }
}
if (isset($id) && false !== ($hIdx = strpos($id, $host))) {
    $id = substr($id, $hIdx + strlen($host) + 1);
}

switch ($action) {
    case 'full':
    case 'rect':
    case 'quiz':
        $id = generateUuid();
        mkdir($id);
        recurse_copy($action, $id);
        $setting = array('action' => $action);
        writeFile(json_encode($setting, JSON_UNESCAPED_SLASHES), $id . '/' . $setting_file);

        header('Location: ' . $id . '/');
        exit;
        break;
    case 'export':
        recurse_copy($id . '/preview', $id . '/' . $id);
        $file = $id . '/' . $id . '.zip';
        zipDir($id . '/' . $id, $file);
        header("Content-Type: application/zip");
        header("Content-Transfer-Encoding: Binary");
        header("Content-Length: ".filesize($file));
        header("Content-Disposition: attachment; filename=\"".basename($file)."\"");
        readfile($file);
        exit;
        break;
    case 'update':
        if ($type == 'file') {

            if (!isset($_FILES['file']['tmp_name']) || $_FILES['file']['tmp_name'] == ''
            || !isset($_POST['filename']) || $_POST['filename'] == ''
            ) {
                exit;
            } else {
                $tmp_name = $_FILES['file'] ['tmp_name'][0];
                $filename = "{$_FILES['file'] ['name'][0]}";
                $filename = $_POST['filename'];

                if (substr($filename, -3) != 'jpg' && substr($filename, -3) != 'svg') {
                    exit;
                }

                move_uploaded_file($tmp_name, $id . '/preview/assets/' . $filename);
                exit;
            }
        } else if ($type == 'var') {
            $setting = readFromFile($id . '/' . $setting_file);
            if($setting){
                $setting = json_decode($setting, 1);

                $idx_html = readFromFile($setting['action'] . '/preview/index.html');
                if($idx_html){
                    $setting[$key] = $value;
                    writeFile(json_encode($setting, JSON_UNESCAPED_SLASHES), $id . '/' . $setting_file);

                    foreach ($setting as $k => $v) {
                        $idx_html = str_replace('%'.$k.'%', $v, $idx_html);
                    }
                    writeFile($idx_html, $id . '/' . 'preview/index.html');
                }
            }
            exit;
        }
    case 'json':
        $setting = readFromFile($id . '/' . $setting_file);

        if ($setting) {
            $setting = json_decode($setting, 1);

            writeFile($data, $id . '/' . $config_file);
            recurse_replace($setting['action'] . '/preview', $id . '/preview', JSON_KEYWORD, $data);

            $new_setting = array_merge($setting, json_decode($data, 1));
            writeFile(json_encode($new_setting, JSON_UNESCAPED_SLASHES), $id . '/' . $setting_file);
        }
        exit;
        break;
    break;
}

header('Location: home/');
exit;
