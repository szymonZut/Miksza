<?php /** @var $gry ?\App\Model\Gry */ ?>

<div class="form-group">
    <label>Subject</label>
    <input type="text" name="gry[subject]" value="<?= $gry ? $gry->getSubject() : '' ?>">
</div>

<div class="form-group">
    <label>Content</label>
    <textarea name="gry[content]"><?= $gry ? $gry->getContent() : '' ?></textarea>
</div>

<input type="submit" value="Zapisz">