<?php

function writeFile($msg, $fname)
{
    $f = fopen($fname, 'w');
    fwrite($f, $msg);
    fclose($f);
}

function readFromFile($fname)
{
    $f = fopen($fname, 'r') or die('');
    $rtn = fread($f, filesize($fname));
    fclose($f);
    return $rtn;
}

function recurse_replace($src, $dist, $key, $value)
{
    $dir = opendir($src);
    if (!is_dir($dist)) {
        @mkdir($dist);
    }

    while (false !== ($file = readdir($dir))) {
        if (('.' != $file) && ('..' != $file)) {
            if (is_dir($src . '/' . $file)) {
                continue;
            } else {
                $content = readFromFile($src . '/' . $file);

                if ($content) {
                    $level1 = preg_replace("/\'$key\'/", $value, $content);
                    $level2 = preg_replace("/\"$key\"/", $value, $level1);
                    writeFile($level2, $dist . '/' . $file);
                }
            }
        }
    }
    closedir($dir);
}

function generateUuid()
{
    return dechex(microtime(true)*10000) . '-' . rand(10,99);
}

function recurse_copy($src, $dist) {
    $dir = opendir($src);
    if(!is_dir($dist)){
        @mkdir($dist);
    }

    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if (is_dir($src . '/' . $file)) {
                recurse_copy($src . '/' . $file, $dist . '/' . $file);
            }
            else {
                copy($src . '/' . $file, $dist . '/' . $file);
            }
        }
    }
    closedir($dir);
}

function zipDir($sourcePath, $outZipPath)
{
    $sourcePath = rtrim($sourcePath, '/');
    $pathInfo = pathInfo($sourcePath);
    $parentPath = $pathInfo['dirname'];
    $dirName = $pathInfo['basename'];

    $z = new ZipArchive();
    $z->open($outZipPath, ZIPARCHIVE::CREATE);
    $z->addEmptyDir($dirName);
    folderToZip($sourcePath, $z, strlen("$parentPath/"));
    $z->close();
}

function folderToZip($folder, &$zipFile, $exclusiveLength)
{
    $handle = opendir($folder);
    while (false !== $f = readdir($handle)) {
        if ($f != '.' && $f != '..') {
            $filePath = "$folder/$f";
            // Remove prefix from file path before add to zip.
            $localPath = substr($filePath, $exclusiveLength);
            if (is_file($filePath)) {
                $zipFile->addFile($filePath, $localPath);
            } elseif (is_dir($filePath)) {
                // Add sub-directory.
                $zipFile->addEmptyDir($localPath);
                folderToZip($filePath, $zipFile, $exclusiveLength);
            }
        }
    }
    closedir($handle);
}
