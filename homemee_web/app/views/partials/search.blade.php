{{ Form::open(['id' => 'search']);}}
<input type="text" class="search-box form-control" placeholder="{{ trans('lang.search_placeholder') }}"
       value="{{{isset($term) ? $term : ''}}}">
<input style="display:none;" type="submit" value="search">
{{ Form::close()}}
